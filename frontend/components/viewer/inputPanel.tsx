import React, { Component, createRef, Dispatch } from 'react'
import styled from 'styled-components'
import { ZOOM_STEP, MAX_SCALE } from 'consts/viewer'
import calcDistance from 'libs/viewer/calcDistance'

interface InputPanelProps {
  baseSize: { width: number; height: number }
  clientRect: { top: number; left: number }
  scale: number
  translate: { x: number; y: number }
  onChangeScale: Dispatch<number>
  onChangeTranslate: Dispatch<{ x: number; y: number }>
}

const InputPanelElem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export default class InputPanel extends Component<InputPanelProps> {
  private prevPanPoint = { x: 0, y: 0 }
  private zoomCenter = { x: 0, y: 0 }
  private panning = false
  private zooming = false
  private baseDistance = 0
  private inputPanelRef = createRef<HTMLDivElement>()

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
      this.baseDistance = calcDistance(e.touches) / this.props.scale
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
        (touches[0].pageX + touches[1].pageY) / 2,
        (touches[0].pageY + touches[1].pageY) / 2,
        calcDistance(touches) / this.baseDistance - this.props.scale
      )
    }
  }

  private onMouseUp = () => {
    this.panning = false
  }

  private onTouchEnd = ({ touches }: TouchEvent) => {
    // ズーム後に指1本でパンに移行してガタつくのを防ぐ
    if (touches.length === 0) this.zooming = false
  }

  private onWheel = (e: WheelEvent) => {
    e.preventDefault()
    this.onZoom(e.clientX, e.clientY, e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP)
  }

  private startPan(e: React.MouseEvent | Touch) {
    this.prevPanPoint = { x: e.pageX, y: e.pageY }
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
