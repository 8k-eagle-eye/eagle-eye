import React, { useState, useCallback, useEffect, createRef } from 'react'
import styled from 'styled-components'
import VideoContainer from './videoContainer'
import InputPanel from './inputPanel'

interface ViewerProps {
  aspect: number
}

const ViewerRoot = styled.div<{ aspect: number }>`
  padding-top: ${({ aspect }) => 100 / aspect}%;
  position: relative;
  overflow: hidden;
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
  const { aspect } = props
  const viewerRef = createRef<HTMLDivElement>()
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0 })
  const [clientRect, setClientRect] = useState({ top: 0, left: 0 })
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [playing, setPlaying] = useState(false)

  const togglePlaying = useCallback(() => setPlaying(!playing), [playing])

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

    return () => window.removeEventListener('resize', calcBaseSize, false)
  }, [])

  return (
    <ViewerRoot ref={viewerRef} aspect={aspect}>
      <VideoContainer playing={playing} scale={scale} translate={translate} />
      <InputPanel
        baseSize={baseSize}
        clientRect={clientRect}
        scale={scale}
        translate={translate}
        onChangeScale={setScale}
        onChangeTranslate={setTranslate}
      />
      <PlayIcon onClick={togglePlaying}>{playing ? '■' : '▶'}</PlayIcon>
    </ViewerRoot>
  )
}

export default Viewer
