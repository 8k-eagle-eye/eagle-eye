import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import styled from 'styled-components'
import VideoContainer from './videoContainer'
import InputPanel from './inputPanel'
import Poster from './poster'
import AnimationIcon from './animationIcon'
import ControlsBar from './controlsBar'
import useVideoController from 'hooks/viewer/useVideoController'

export interface ViewerProps {
  aspect: number
  baseUrl: string
  duration: number
}

interface FullScreenContainerProps {
  isFullScreen: boolean
  aspect: number
  fullScreenAspect: number
}

const ViewerRoot = styled.div<{ aspect: number; isFullScreen: boolean }>`
  padding-top: ${({ aspect }) => 100 / aspect}%;
  position: relative;
  background: #222;
  z-index: ${({ isFullScreen }) => (isFullScreen ? 10000 : 'auto')};
`

const FullScreenContainer = styled.div<FullScreenContainerProps>`
  position: ${({ isFullScreen }) => (isFullScreen ? 'fixed' : 'absolute')};
  width: ${({ isFullScreen, aspect, fullScreenAspect }) =>
    (isFullScreen ? (aspect > fullScreenAspect ? 1 : aspect / fullScreenAspect) : 1) * 100}%;
  height: ${({ isFullScreen, aspect, fullScreenAspect }) =>
    (isFullScreen ? (aspect > fullScreenAspect ? fullScreenAspect / aspect : 1) : 1) * 100}%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
`

const ExitFullScreenPanel = styled.div`
  background: rgba(0, 0, 0, 0.85);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const ScalePanel = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background: #fff;
  border-radius: 5px;
  padding: 6px 0;
  width: 64px;
  font-size: 16px;
  text-align: center;
  color: #222;
`

const Viewer = (props: ViewerProps) => {
  const { aspect, baseUrl, duration } = props
  const viewerRef = useRef<HTMLDivElement>(null)
  const fullScreenPanelRef = useRef<HTMLDivElement>(null)
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0 })
  const [clientRect, setClientRect] = useState({ top: 0, left: 0 })
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [destinationTranslate, setDestinationTranslate] = useState({ x: 0, y: 0 })
  const [initialized, setInitialized] = useState(false)
  const [animationIconVisible, setAnimationIconVisible] = useState(true)
  const [isFullScreen, setFullScreen] = useState(false)
  const [fullScreenAspect, setFullScreenAspect] = useState(1)
  const {
    videoRef,
    currentTime,
    changeCurrentTimeOnSeek,
    playing,
    onPause,
    onPlay
  } = useVideoController()
  const resolutionRatio = useMemo(() => (scale >= 8 ? 8 : scale >= 4 ? 4 : scale >= 2 ? 2 : 1), [
    scale
  ])
  const gridSize = useMemo(
    () => ({
      x: scale / resolutionRatio / 2,
      y: scale / resolutionRatio / 2
    }),
    [scale]
  )

  const togglePlaying = useCallback(() => {
    if (playing) onPause()
    else onPlay()
  }, [playing, onPlay])

  const toggleFullScreen = useCallback(() => setFullScreen(!isFullScreen), [isFullScreen])

  const playFirstTime = useCallback(() => {
    setInitialized(true)
    onPlay()
  }, [])

  const calcBaseSize = useCallback(() => {
    const viewerElem = viewerRef.current!
    const { clientWidth, clientHeight } = viewerElem
    const { top, left } = viewerElem.getBoundingClientRect()
    const fullScreenPanelElem = fullScreenPanelRef.current

    setBaseSize({ width: clientWidth, height: clientHeight })
    setClientRect({ top, left })

    if (fullScreenPanelElem) {
      setFullScreenAspect(fullScreenPanelElem.clientWidth / fullScreenPanelElem.clientHeight)
    }
  }, [])

  useEffect(() => setAnimationIconVisible(!initialized), [scale])

  useEffect(() => {
    if (initialized) calcBaseSize()
  }, [initialized, isFullScreen])

  useEffect(() => {
    if (!initialized) return

    window.addEventListener('resize', calcBaseSize, false)
    window.addEventListener('scroll', calcBaseSize, false)

    return () => {
      window.removeEventListener('resize', calcBaseSize, false)
      window.removeEventListener('scroll', calcBaseSize, false)
    }
  }, [initialized])

  return (
    <ViewerRoot aspect={aspect} isFullScreen={isFullScreen}>
      {initialized ? (
        <>
          {isFullScreen ? (
            <ExitFullScreenPanel ref={fullScreenPanelRef} onClick={toggleFullScreen} />
          ) : null}

          <FullScreenContainer
            ref={viewerRef}
            isFullScreen={isFullScreen}
            aspect={aspect}
            fullScreenAspect={fullScreenAspect}
          >
            <VideoContainer
              baseUrl={baseUrl}
              playing={playing}
              scale={scale}
              gridSize={gridSize}
              videoRef={videoRef}
              currentTime={currentTime}
              resolutionRatio={resolutionRatio}
              translate={translate}
              destinationTranslate={destinationTranslate}
            />

            {animationIconVisible ? <AnimationIcon>Try zooming!</AnimationIcon> : null}

            <ScalePanel>x {Math.floor(scale * 10) / 10}</ScalePanel>

            <InputPanel
              baseSize={baseSize}
              clientRect={clientRect}
              scale={scale}
              gridSize={gridSize}
              translate={translate}
              destinationTranslate={destinationTranslate}
              onChangeScale={setScale}
              onChangeTranslate={setTranslate}
              onChangeDestinationTranslate={setDestinationTranslate}
            />

            <ControlsBar
              playing={playing}
              currentTime={currentTime}
              duration={duration}
              isFullScreen={isFullScreen}
              onSeekTime={changeCurrentTimeOnSeek}
              onTogglePlaying={togglePlaying}
              onToggleFullScreen={toggleFullScreen}
            />
          </FullScreenContainer>
        </>
      ) : (
        <Poster baseUrl={baseUrl} onClick={playFirstTime} />
      )}
    </ViewerRoot>
  )
}

export default Viewer
