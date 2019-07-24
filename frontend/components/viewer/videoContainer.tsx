import React, { createRef, useState, useCallback, SyntheticEvent } from 'react'
import styled from 'styled-components'
import useVideoController from 'hooks/viewer/useVideoController'
import FrontVideo from './frontVideo'

interface VideoContainerProps {
  playing: boolean
  scale: number
  gridSize: { width: number; height: number }
  resolutionRatio: number
  translate: { x: number; y: number }
  finallyTranslate: { x: number; y: number }
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
  const { playing, translate, scale, gridSize, resolutionRatio, finallyTranslate } = props
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
        src={`${process.env.STORAGE_ORIGIN}/videos/hd/1-1.mp4`}
        onTimeUpdate={setCurrentTimeOnTimeUpdate}
        loop
        playsInline
      />
      <FrontVideo
        playing={playing}
        currentTime={currentTime}
        scale={scale}
        gridSize={gridSize}
        resolutionRatio={resolutionRatio}
        finallyTranslate={finallyTranslate}
      />
    </Container>
  )
}

export default VideoContainer
