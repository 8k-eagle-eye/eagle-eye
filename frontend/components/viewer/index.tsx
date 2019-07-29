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

const ViewerRoot = styled.div<{ aspect: number }>`
  padding-top: ${({ aspect }) => 100 / aspect}%;
  position: relative;
  overflow: hidden;
  background: #222;
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
  const viewerRef = createRef<HTMLDivElement>()
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0 })
  const [clientRect, setClientRect] = useState({ top: 0, left: 0 })
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [destinationTranslate, setFinallyTranslate] = useState({ x: 0, y: 0 })
  const [initialized, setInitialized] = useState(false)
  const [animationIconVisible, setAnimationIconVisible] = useState(true)
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

  const playFirstTime = useCallback(() => {
    setInitialized(true)
    onPlay()
  }, [])

  useEffect(() => setAnimationIconVisible(!initialized), [scale])

  useEffect(() => {
    const viewerElem = viewerRef.current!
    const calcBaseSize = () => {
      const { clientWidth, clientHeight } = viewerElem
      const { top, left } = viewerElem.getBoundingClientRect()

      setBaseSize({ width: clientWidth, height: clientHeight })
      setClientRect({ top, left })
    }

    calcBaseSize()
    window.addEventListener('resize', calcBaseSize, false)
    window.addEventListener('scroll', calcBaseSize, false)

    return () => {
      window.removeEventListener('resize', calcBaseSize, false)
      window.removeEventListener('scroll', calcBaseSize, false)
    }
  }, [])

  return (
    <ViewerRoot ref={viewerRef} aspect={aspect}>
      {initialized ? (
        <>
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
            onSeekTime={onSeekTime}
            onTogglePlaying={togglePlaying}
          />
        </>
      ) : (
        <Poster baseUrl={baseUrl} onClick={playFirstTime} />
      )}
    </ViewerRoot>
  )
}

export default Viewer
