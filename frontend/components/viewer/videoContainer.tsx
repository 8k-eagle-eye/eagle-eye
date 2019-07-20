import React, { createRef } from 'react'
import styled from 'styled-components'
import useVideoController from 'hooks/viewer/useVideoController.ts'

interface VideoContainerProps {
  playing: boolean
  scale: number
  translate: { x: number; y: number }
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
  const { playing, translate, scale } = props

  useVideoController(videoRef, playing)

  return (
    <Container translate={translate} scale={scale}>
      <BaseVideo
        ref={videoRef}
        src={`${process.env.STORAGE_ORIGIN}/videos/hd/1-1.mp4`}
        loop
        playsInline
      />
    </Container>
  )
}

export default VideoContainer
