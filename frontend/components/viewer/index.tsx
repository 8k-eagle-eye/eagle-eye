import React, { useState, createRef } from 'react'
import styled from 'styled-components'

interface ViewerProps {
  aspect: number
}

const ViewerRoot = styled.div<{ aspect: number }>`
  padding-top: ${({ aspect }) => 100 / aspect}%;
  position: relative;
`

const MediaFrame = styled.div`
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

const Viewer = (props: ViewerProps) => {
  const videoRef = createRef<HTMLVideoElement>()
  const [playing, setPlaying] = useState(false)
  const togglePlaying = () => {
    const video = videoRef.current!

    if (video.paused) {
      video.play()
      setPlaying(true)
    } else {
      video.pause()
      setPlaying(false)
    }
  }

  return (
    <ViewerRoot aspect={props.aspect}>
      <MediaFrame>
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

export default Viewer
