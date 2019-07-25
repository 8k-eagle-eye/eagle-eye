import React, { createRef, useMemo, useState, useCallback, SyntheticEvent } from 'react'
import styled from 'styled-components'
import useVideoController from 'hooks/viewer/useVideoController'
import getVideoSrc from 'libs/viewer/getVideoSrc'
import FrontVideo from './frontVideo'

interface VideoContainerProps {
  baseUrl: string
  playing: boolean
  scale: number
  gridSize: { width: number; height: number }
  resolutionRatio: number
  translate: { x: number; y: number }
  destinationTranslate: { x: number; y: number }
}

interface ContainerProps {
  translate: { x: number; y: number }
  scale: number
}

const Container = styled.div.attrs(({ translate, scale }: ContainerProps) => ({
  style: {
    transform: `translate(-${translate.x}px, -${translate.y}px) scale(${scale})`
  }
}))<ContainerProps>`
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

const VideoContainer = (props: VideoContainerProps) => {
  const videoRef = createRef<HTMLVideoElement>()
  const {
    baseUrl,
    playing,
    translate,
    scale,
    gridSize,
    resolutionRatio,
    destinationTranslate
  } = props
  const baseVideoSrc = useMemo(
    () => getVideoSrc({ baseUrl, resolutionRatio: 1, gridIndexTop: 0, gridIndexLeft: 0 }),
    [baseUrl]
  )
  const [currentTime, setCurrentTime] = useState(0)
  const setCurrentTimeOnTimeUpdate = useCallback(
    (e: SyntheticEvent<HTMLVideoElement>) => setCurrentTime(e.currentTarget.currentTime),
    []
  )

  useVideoController(videoRef, playing)

  return (
    <Container translate={translate} scale={scale}>
      <BaseVideo
        ref={videoRef}
        src={baseVideoSrc}
        onTimeUpdate={setCurrentTimeOnTimeUpdate}
        loop
        playsInline
      />
      <FrontVideo
        baseUrl={baseUrl}
        playing={playing}
        currentTime={currentTime}
        scale={scale}
        gridSize={gridSize}
        resolutionRatio={resolutionRatio}
        destinationTranslate={destinationTranslate}
      />
    </Container>
  )
}

export default VideoContainer
