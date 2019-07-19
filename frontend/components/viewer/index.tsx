import React, { Component, createRef } from 'react'
import styled from 'styled-components'
import { ZOOM_STEP } from 'consts/viewer'
import VideoContainer from './videoContainer'

interface ViewerProps {
  aspect: number
}

interface ViewerState {
  playing: boolean
  panning: boolean
  baseSize: { width: number; height: number }
  clientRect: { top: number; left: number }
  prevPanPoint: { x: number; y: number },
  zoomPointX: number,
  zoomPointY: number,
  deltaDetection: number
}

const ViewerRoot = styled.div<{ aspect: number }>`
  padding-top: ${({ aspect }) => 100 / aspect}%;
  position: relative;
  overflow: hidden;
`

const InputPanel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
  }

  public state = {
    playing: false,
    panning: false,
    baseSize: { width: 0, height: 0 },
    clientRect: { top: 0, left: 0 },
    prevPanPoint: { x: 0, y: 0 },
    zoomPointX: 0,
    zoomPointY: 0,
    deltaDetection: 0
  }

  private inputPanelRef = createRef<HTMLDivElement>()
  private translateXDelta = 0
  private translateYDelta = 0
  private scaleDelta = 0

  private togglePlaying = () => this.setState(({ playing }) => ({ playing: !playing }))

  private calcBaseSize = () => {
    const inputPanelElem = this.inputPanelRef.current!
    const { clientWidth, clientHeight } = inputPanelElem
    const { top, left } = inputPanelElem.getBoundingClientRect()

    this.setState(() => ({
      baseSize: { width: clientWidth, height: clientHeight },
      clientRect: { top, left }
    }))
  }

  private startPan(e: React.MouseEvent) {
    this.setState({ prevPanPoint: { x: e.pageX, y: e.pageY } })
  }

  private movePan(e: MouseEvent) {
    const { prevPanPoint } = this.state
    const currentPanPoint = { x: e.pageX, y: e.pageY }

    this.translateXDelta = currentPanPoint.x - prevPanPoint.x
    this.translateYDelta = currentPanPoint.y - prevPanPoint.y

    this.setState(({ deltaDetection }) => ({
      deltaDetection: deltaDetection + 1,
      prevPanPoint: currentPanPoint
    }))
  }

  private onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    this.setState({ panning: true })
    this.startPan(e)
  }

  private onMouseMove = (e: MouseEvent) => {
    if (!this.state.panning) return
    this.movePan(e)
  }

  private onMouseUp = () => {
    this.setState({ panning: false })
  }

  private onWheel = (e: WheelEvent) => {
    e.preventDefault()

    this.scaleDelta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP
    this.setState(({ deltaDetection }) => ({
      zoomPointX: e.clientX,
      zoomPointY: e.clientY,
      deltaDetection: deltaDetection + 1
    }))
  }

  public componentDidMount() {
    this.calcBaseSize()

    window.addEventListener('resize', this.calcBaseSize, false)
    document.addEventListener('mousemove', this.onMouseMove, false)
    document.addEventListener('mouseup', this.onMouseUp, false)
    this.inputPanelRef.current!.addEventListener('wheel', this.onWheel, false)
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.calcBaseSize, false)
    document.removeEventListener('mousemove', this.onMouseMove, false)
    document.removeEventListener('mouseup', this.onMouseUp, false)
    this.inputPanelRef.current!.removeEventListener('wheel', this.onWheel, false)
  }

  public componentDidUpdate() {
    this.translateXDelta = 0
    this.translateYDelta = 0
    this.scaleDelta = 0
  }

  public render() {
    const { aspect } = this.props
    const { playing, deltaDetection, baseSize, clientRect, zoomPointX, zoomPointY } = this.state
    const {
      inputPanelRef,
      translateXDelta,
      translateYDelta,
      scaleDelta,
      togglePlaying,
      onMouseDown
    } = this

    return (
      <ViewerRoot aspect={aspect}>
        <VideoContainer
          baseSize={baseSize}
          clientRect={clientRect}
          zoomPointX={zoomPointX}
          zoomPointY={zoomPointY}
          playing={playing}
          translateXDelta={translateXDelta}
          translateYDelta={translateYDelta}
          scaleDelta={scaleDelta}
          deltaDetection={deltaDetection}
        />
        <InputPanel ref={inputPanelRef} onMouseDown={onMouseDown} />
        <PlayIcon onClick={togglePlaying}>{playing ? '■' : '▶'}</PlayIcon>
      </ViewerRoot>
    )
  }
}
