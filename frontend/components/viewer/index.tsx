import React, { useState, useCallback, useEffect, createRef, useMemo } from 'react'
import styled from 'styled-components'
import VideoContainer from './videoContainer'
import InputPanel from './inputPanel'
import Poster from './poster'
import AnimationIcon from './animationIcon'
import ControlsBar from './controlsBar'
import useTimeController from 'hooks/viewer/useTimeController'

export interface ViewerProps {
  aspect: number
  baseUrl: string
  duration: number
}

interface FullScreenContainerProps {
  isFullScreen: boolean
  aspect: number
  windowAspect: number
}

const ViewerRoot = styled.div<{ aspect: number; isFullScreen: boolean }>`
  padding-top: ${({ aspect }) => 100 / aspect}%;
  position: relative;
  background: #222;
  z-index: ${({ isFullScreen }) => (isFullScreen ? 10000 : 'auto')};
`

const FullScreenContainer = styled.div<FullScreenContainerProps>`
  position: ${({ isFullScreen }) => (isFullScreen ? 'fixed' : 'absolute')};
  width: ${({ isFullScreen, aspect, windowAspect }) =>
    (isFullScreen ? (aspect > windowAspect ? 1 : aspect / windowAspect) : 1) * 100}%;
  height: ${({ isFullScreen, aspect, windowAspect }) =>
    (isFullScreen ? (aspect > windowAspect ? windowAspect / aspect : 1) : 1) * 100}%;
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
  const viewerRef = useMemo(() => createRef<HTMLDivElement>(), [])
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0 })
  const [clientRect, setClientRect] = useState({ top: 0, left: 0 })
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [destinationTranslate, setFinallyTranslate] = useState({ x: 0, y: 0 })
  const [initialized, setInitialized] = useState(false)
  const [animationIconVisible, setAnimationIconVisible] = useState(true)
  const [isFullScreen, setFullScreen] = useState(false)
  const [windowAspect, setWindowAspect] = useState(1)
  const { playing, onPause, onPlay, currentTime, onSeekTime } = useTimeController(duration)
  const resolutionRatio = useMemo(() => (scale >= 8 ? 8 : scale >= 4 ? 4 : scale >= 2 ? 2 : 1), [
    scale
  ])
  const gridSize = useMemo(
    () => ({
      width: (baseSize.width * scale) / resolutionRatio / 2,
      height: (baseSize.height * scale) / resolutionRatio / 2
    }),
    [baseSize, scale]
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

    setBaseSize({ width: clientWidth, height: clientHeight })
    setClientRect({ top, left })
    setWindowAspect(window.innerWidth / window.innerHeight)
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
          {isFullScreen ? <ExitFullScreenPanel onClick={toggleFullScreen} /> : null}

          <FullScreenContainer
            ref={viewerRef}
            isFullScreen={isFullScreen}
            aspect={aspect}
            windowAspect={windowAspect}
          >
            <VideoContainer
              baseUrl={baseUrl}
              playing={playing}
              scale={scale}
              gridSize={gridSize}
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
              onChangeFinallyTranslate={setFinallyTranslate}
            />

            <ControlsBar
              playing={playing}
              currentTime={currentTime}
              duration={duration}
              isFullScreen={isFullScreen}
              onSeekTime={onSeekTime}
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
