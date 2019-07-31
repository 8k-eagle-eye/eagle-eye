import React, { Component, createRef, Dispatch } from 'react'
import styled from 'styled-components'
import { ZOOM_STEP, MAX_SCALE, GRID_ANIMATION_STEP, DELAY_ANIMATION_ON_ZOOM } from 'consts/viewer'
import calculateDistance from 'libs/viewer/calculateDistance'

interface InputPanelProps {
  baseSize: { width: number; height: number }
  clientRect: { top: number; left: number }
  scale: number
  gridSize: { width: number; height: number }
  translate: { x: number; y: number }
  destinationTranslate: { x: number; y: number }
  onChangeScale: Dispatch<number>
  onChangeTranslate: Dispatch<{ x: number; y: number }>
  onChangeFinallyTranslate: Dispatch<{ x: number; y: number }>
}

const InputPanelElem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: move;
`

export default class InputPanel extends Component<InputPanelProps> {
  private prevPanPoint = { x: 0, y: 0 }

  private zoomCenter = { x: 0, y: 0 }

  private panning = false

  private zooming = false

  private baseDistance = 0

  private inputPanelRef = createRef<HTMLDivElement>()

  private timeoutId: number | null = null

  private animationFrameId: number | null = null

  private onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    this.panning = true
    this.startPan(e)
  }

  private onTouchStart = (e: TouchEvent) => {
    e.preventDefault()

    if (e.touches.length === 1) {
      this.startPan(e.touches[0])
    } else if (e.touches.length === 2) {
      this.zooming = true
      this.baseDistance = calculateDistance(e.touches) / this.props.scale
    }
  }

  private onMouseMove = (e: MouseEvent) => {
    if (!this.panning) {
      return
    }

    this.movePan(e)
  }

  private onTouchMove = ({ touches }: TouchEvent) => {
    if (touches.length === 1 && !this.zooming) {
      this.movePan(touches[0])
    } else if (touches.length === 2) {
      this.onZoom(
        (touches[0].clientX + touches[1].clientX) / 2,
        (touches[0].clientY + touches[1].clientY) / 2,
        calculateDistance(touches) / this.baseDistance - this.props.scale
      )
    }
  }

  private onMouseUp = () => {
    this.panning = false
    this.startMoveToGrid()
  }

  private onTouchEnd = ({ touches }: TouchEvent) => {
    // ズーム後に指1本でパンに移行してガタつくのを防ぐ
    if (touches.length === 0) this.zooming = false
    this.startMoveToGrid()
  }

  private onWheel = (e: WheelEvent) => {
    e.preventDefault()
    this.onZoom(e.clientX, e.clientY, e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP)
    this.stopMoveToGrid()

    if (this.timeoutId) clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(this.startMoveToGrid, DELAY_ANIMATION_ON_ZOOM)
  }

  private startPan(e: React.MouseEvent | Touch) {
    this.prevPanPoint = { x: e.pageX, y: e.pageY }
    this.stopMoveToGrid()
  }

  private movePan(e: MouseEvent | Touch) {
    const { prevPanPoint } = this
    const currentPanPoint = { x: e.pageX, y: e.pageY }

    this.transform(0, currentPanPoint.x - prevPanPoint.x, currentPanPoint.y - prevPanPoint.y)
    this.prevPanPoint = currentPanPoint
  }

  private onZoom(pointX: number, pointY: number, scaleDelta: number) {
    const { clientRect, translate } = this.props

    this.zoomCenter = {
      x: pointX - clientRect.left + translate.x,
      y: pointY - clientRect.top + translate.y
    }

    this.transform(scaleDelta, 0, 0)
  }

  private transform(scaleDelta: number, translateXDelta: number, translateYDelta: number) {
    const { scale, translate, baseSize, onChangeScale, onChangeTranslate } = this.props
    const { zoomCenter } = this
    const newScale = Math.min(MAX_SCALE, Math.max(1, scale + scaleDelta))
    const pinpoint = {
      x: zoomCenter.x - translate.x + translateXDelta,
      y: zoomCenter.y - translate.y + translateYDelta
    }

    onChangeScale(newScale)
    onChangeTranslate({
      x: Math.max(
        0,
        Math.min(baseSize.width * (newScale - 1), (zoomCenter.x / scale) * newScale - pinpoint.x)
      ),
      y: Math.max(
        0,
        Math.min(baseSize.height * (newScale - 1), (zoomCenter.y / scale) * newScale - pinpoint.y)
      )
    })
  }

  private startMoveToGrid = () => {
    const { baseSize, gridSize, translate, onChangeFinallyTranslate } = this.props
    const modX = (translate.x + baseSize.width / 2) % gridSize.width
    const modY = (translate.y + baseSize.height / 2) % gridSize.height

    onChangeFinallyTranslate({
      x: translate.x - (modX > gridSize.width / 2 ? modX - gridSize.width : modX),
      y: translate.y - (modY > gridSize.height / 2 ? modY - gridSize.height : modY)
    })

    this.animationFrameId = requestAnimationFrame(this.runGridAnimation)
  }

  private runGridAnimation = () => {
    const { translate, destinationTranslate } = this.props
    const step = GRID_ANIMATION_STEP
    const diffXToGrid = translate.x - destinationTranslate.x
    const diffYToGrid = translate.y - destinationTranslate.y

    const newDiffX =
      Math.abs(diffXToGrid) <= step ? 0 : diffXToGrid + (diffXToGrid < 0 ? step : -step)
    const newDiffY =
      Math.abs(diffYToGrid) <= step ? 0 : diffYToGrid + (diffYToGrid < 0 ? step : -step)

    this.transform(0, diffXToGrid - newDiffX, diffYToGrid - newDiffY)

    if (newDiffX === 0 && newDiffY === 0) {
      this.stopMoveToGrid()
    } else {
      this.animationFrameId = requestAnimationFrame(this.runGridAnimation)
    }
  }

  private stopMoveToGrid() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId)
  }

  public componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove, false)
    document.addEventListener('mouseup', this.onMouseUp, false)
    document.addEventListener('touchmove', this.onTouchMove, false)
    document.addEventListener('touchend', this.onTouchEnd, false)
    this.inputPanelRef.current!.addEventListener('wheel', this.onWheel, false)
    this.inputPanelRef.current!.addEventListener('touchstart', this.onTouchStart, false)
  }

  public componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove, false)
    document.removeEventListener('mouseup', this.onMouseUp, false)
    document.removeEventListener('touchmove', this.onTouchMove, false)
    document.removeEventListener('touchend', this.onTouchEnd, false)
    this.inputPanelRef.current!.removeEventListener('wheel', this.onWheel, false)
    this.inputPanelRef.current!.removeEventListener('touchstart', this.onTouchStart, false)
  }

  public render() {
    return <InputPanelElem ref={this.inputPanelRef} onMouseDown={this.onMouseDown} />
  }
}
