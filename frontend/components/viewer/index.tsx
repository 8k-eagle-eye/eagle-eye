import React, { useState, useCallback, useEffect, createRef, useMemo } from 'react'
import styled from 'styled-components'
import VideoContainer from './videoContainer'
import InputPanel from './inputPanel'
import Poster from './poster'
import AnimationIcon from './animationIcon'

export interface ViewerProps {
  aspect: number
  baseUrl: string
}

const ViewerRoot = styled.div<{ aspect: number }>`
  padding-top: ${({ aspect }) => 100 / aspect}%;
  position: relative;
  overflow: hidden;
  background: #222;
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

const Viewer = (props: ViewerProps) => {
  const { aspect, baseUrl } = props
  const viewerRef = createRef<HTMLDivElement>()
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0 })
  const [clientRect, setClientRect] = useState({ top: 0, left: 0 })
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [destinationTranslate, setFinallyTranslate] = useState({ x: 0, y: 0 })
  const [initialized, setInitialized] = useState(false)
  const [playing, setPlaying] = useState(false)
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

  const togglePlaying = useCallback(() => setPlaying(!playing), [playing])
  const playFirstTime = useCallback(() => {
    setInitialized(true)
    setPlaying(true)
  }, [])

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
            resolutionRatio={resolutionRatio}
            translate={translate}
            destinationTranslate={destinationTranslate}
          />
          <AnimationIcon>Try zooming!</AnimationIcon>
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
          <PlayIcon onClick={togglePlaying}>{playing ? '■' : '▶'}</PlayIcon>
        </>
      ) : (
        <Poster baseUrl={baseUrl} onClick={playFirstTime} />
      )}
    </ViewerRoot>
  )
}

export default Viewer
