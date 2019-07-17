import React, { Component, createRef } from 'react'
import styled from 'styled-components'
import { MAX_SCALE, ZOOM_STEP, GRID_ANIMATION_STEP, DELAY_ANIMATION_ON_ZOOM } from 'consts/viewer'

interface ViewerProps {
  aspect: number
}

interface ViewerState {
  playing: boolean
  panning: boolean
  baseSize: { width: number; height: number }
  scale: number
  translate: { x: number; y: number }
  clientRect: { top: number; left: number }
  zoomCenter: { x: number; y: number }
  prevPanPoint: { x: number; y: number }
  diffToGrid: { x: number; y: number }
  finallyTranslate: { x: number; y: number }
  animationFrameId: number | null
  timeoutId: number | null
}

const ViewerRoot = styled.div<{ aspect: number }>`
  padding-top: ${({ aspect }) => 100 / aspect}%;
  position: relative;
  overflow: hidden;
`

interface MediaFrameProps {
  translate: { x: number; y: number }
  scale: number
}

const MediaFrame = styled.div.attrs(({ translate, scale }: MediaFrameProps) => ({
  style: {
    transform: `translate(-${translate.x}px, -${translate.y}px) scale(${scale})`
  }
}))<MediaFrameProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  transform-origin: left top;
`

const BaseVideo = styled.video`
  vertical-align: bottom;
  width: 100%;
`

const PlayIcon = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: #ffffffaa;
  border-radius: 10px;
  cursor: pointer;
  padding: 5px 15px;
  font-size: 20px;

  &:hover {
    background: #fff;
  }
`

export default class Viewer extends Component<ViewerProps, ViewerState> {
  private constructor(props: ViewerProps) {
    super(props)

    this.state = {
      playing: false,
      panning: false,
      baseSize: { width: 0, height: 0 },
      scale: 1,
      translate: { x: 0, y: 0 },
      clientRect: { top: 0, left: 0 },
      zoomCenter: { x: 0, y: 0 },
      prevPanPoint: { x: 0, y: 0 },
      diffToGrid: { x: 0, y: 0 },
      finallyTranslate: { x: 0, y: 0 },
      animationFrameId: null,
      timeoutId: null
    }

    this.togglePlaying = this.togglePlaying.bind(this)
    this.calcBaseSize = this.calcBaseSize.bind(this)
    this.startMoveToGrid = this.startMoveToGrid.bind(this)
    this.runGridAnimation = this.runGridAnimation.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onWheel = this.onWheel.bind(this)
  }

  private rootRef = createRef<HTMLDivElement>()
  private videoRef = createRef<HTMLVideoElement>()

  private get resolutionRatio() {
    const { scale } = this.state
    return scale >= 8 ? 8 : scale >= 4 ? 4 : scale >= 2 ? 2 : 1
  }

  private togglePlaying() {
    const video = this.videoRef.current!

    if (video.paused) {
      video.play()
      this.setState({ playing: true })
    } else {
      video.pause()
      this.setState({ playing: false })
    }
  }

  private calcBaseSize() {
    const rootElem = this.rootRef.current!
    const { top, left } = rootElem.getBoundingClientRect()

    this.setState({
      baseSize: {
        width: rootElem.clientWidth,
        height: rootElem.clientHeight
      },
      clientRect: { top, left }
    })
  }

  private transform(scaleDelta: number, translateXDelta: number, translateYDelta: number) {
    const { scale, zoomCenter, translate, baseSize } = this.state
    const pinpoint = {
      x: zoomCenter.x - translate.x + translateXDelta,
      y: zoomCenter.y - translate.y + translateYDelta
    }
    const newScale = Math.min(MAX_SCALE, Math.max(1, scale + scaleDelta))

    this.setState({
      scale: newScale,
      translate: {
        x: Math.max(
          0,
          Math.min(baseSize.width * (newScale - 1), (zoomCenter.x / scale) * newScale - pinpoint.x)
        ),
        y: Math.max(
          0,
          Math.min(baseSize.height * (newScale - 1), (zoomCenter.y / scale) * newScale - pinpoint.y)
        )
      }
    })
  }

  private startMoveToGrid() {
    const { baseSize, scale, translate } = this.state
    const { resolutionRatio, runGridAnimation } = this

    const gridWidth = (baseSize.width * scale) / resolutionRatio / 2
    const gridHeight = (baseSize.height * scale) / resolutionRatio / 2
    const modX = translate.x % gridWidth
    const modY = translate.y % gridHeight

    this.setState({
      diffToGrid: {
        x: modX > gridWidth / 2 ? gridWidth - modX : -modX,
        y: modY > gridHeight / 2 ? gridHeight - modY : -modY
      },
      animationFrameId: requestAnimationFrame(runGridAnimation)
    })
  }

  private runGridAnimation() {
    const { diffToGrid } = this.state
    const step = GRID_ANIMATION_STEP

    const newDiff = {
      x: Math.abs(diffToGrid.x) <= step ? 0 : diffToGrid.x + (diffToGrid.x < 0 ? step : -step),
      y: Math.abs(diffToGrid.y) <= step ? 0 : diffToGrid.y + (diffToGrid.y < 0 ? step : -step)
    }

    this.transform(0, diffToGrid.x - newDiff.x, diffToGrid.y - newDiff.y)

    if (newDiff.x === 0 && newDiff.y === 0) {
      this.setState({
        diffToGrid: newDiff,
        finallyTranslate: { ...this.state.translate }
      })

      this.stopMoveToGrid()
    } else {
      this.setState({
        diffToGrid: newDiff,
        animationFrameId: requestAnimationFrame(this.runGridAnimation)
      })
    }
  }

  private stopMoveToGrid() {
    const { animationFrameId } = this.state
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
  }

  private startPan(e: React.MouseEvent) {
    this.setState({ prevPanPoint: { x: e.pageX, y: e.pageY } })
    this.stopMoveToGrid()
  }

  private movePan(e: MouseEvent) {
    const { prevPanPoint } = this.state
    const currentPanPoint = { x: e.pageX, y: e.pageY }

    this.transform(0, currentPanPoint.x - prevPanPoint.x, currentPanPoint.y - prevPanPoint.y)
    this.setState({ prevPanPoint: currentPanPoint })
  }

  private onMouseDown(e: React.MouseEvent) {
    e.preventDefault()
    this.setState({ panning: true })
    this.startPan(e)
  }

  private onMouseMove(e: MouseEvent) {
    if (!this.state.panning) return
    this.movePan(e)
  }

  private onMouseUp() {
    this.setState({ panning: false })
    this.startMoveToGrid()
  }

  private onZoom(pointX: number, pointY: number, scaleDelta: number) {
    const { clientRect, translate, timeoutId } = this.state

    this.stopMoveToGrid()
    if (timeoutId) clearTimeout(timeoutId)

    this.setState({
      zoomCenter: {
        x: pointX - clientRect.left + translate.x,
        y: pointY - clientRect.top + translate.y
      },
      timeoutId: setTimeout(this.startMoveToGrid, DELAY_ANIMATION_ON_ZOOM)
    })
    this.transform(scaleDelta, 0, 0)
  }

  private onWheel(e: WheelEvent) {
    e.preventDefault()
    this.onZoom(e.clientX, e.clientY, e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP)
  }

  public componentDidMount() {
    this.calcBaseSize()

    window.addEventListener('resize', this.calcBaseSize, false)
    document.addEventListener('mousemove', this.onMouseMove, false)
    document.addEventListener('mouseup', this.onMouseUp, false)
    this.rootRef.current!.addEventListener('wheel', this.onWheel, false)
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.calcBaseSize, false)
    document.removeEventListener('mousemove', this.onMouseMove, false)
    document.removeEventListener('mouseup', this.onMouseUp, false)
    this.rootRef.current!.removeEventListener('wheel', this.onWheel, false)
  }

  public render() {
    const { aspect } = this.props
    const { playing, translate, scale } = this.state
    const { rootRef, videoRef, togglePlaying, onMouseDown } = this

    return (
      <ViewerRoot ref={rootRef} aspect={aspect}>
        <MediaFrame translate={translate} scale={scale} onMouseDown={onMouseDown}>
          <BaseVideo
            ref={videoRef}
            src={`${process.env.STORAGE_ORIGIN}/videos/hd/1-1.mp4`}
            loop
            playsInline
          />
        </MediaFrame>

        <PlayIcon onClick={togglePlaying}>{playing ? '■' : '▶'}</PlayIcon>
      </ViewerRoot>
    )
  }
}
