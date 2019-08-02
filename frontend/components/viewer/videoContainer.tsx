import React, { useRef, useMemo } from 'react'
import styled from 'styled-components'
import useVideoController from 'hooks/viewer/useVideoController'
import getVideoSrc from 'libs/viewer/getVideoSrc'
import FrontVideo from './frontVideo'

interface VideoContainerProps {
  baseUrl: string
  playing: boolean
  scale: number
  currentTime: number
  gridSize: { x: number; y: number }
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
    transform: `translate(-${translate.x * 100}%, -${translate.y * 100}%) scale(${scale})`
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
  const videoRef = useRef<HTMLVideoElement>(null)
  const {
    baseUrl,
    playing,
    translate,
    scale,
    currentTime,
    gridSize,
    resolutionRatio,
    destinationTranslate
  } = props
  const baseVideoSrc = useMemo(
    () => getVideoSrc({ baseUrl, resolutionRatio: 1, gridIndexTop: 0, gridIndexLeft: 0 }),
    [baseUrl]
  )

  useVideoController(videoRef, playing, currentTime)

  return (
    <Container translate={translate} scale={scale}>
      <BaseVideo ref={videoRef} src={baseVideoSrc} loop playsInline />
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
