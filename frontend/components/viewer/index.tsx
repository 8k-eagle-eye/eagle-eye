import React, { useEffect, useState, useCallback, createRef } from 'react'
import styled from 'styled-components'
import { MAX_SCALE, ZOOM_STEP } from 'consts/viewer'

interface ViewerProps {
  aspect: number
}

const ViewerRoot = styled.div<{ aspect: number }>`
  padding-top: ${({ aspect }) => 100 / aspect}%;
  position: relative;
  overflow: hidden;
`

interface MediaFrameProps {
  translate: { x: number; y: number }
  scale: number
}

const MediaFrame = styled.div.attrs(({ translate, scale }: MediaFrameProps) => ({
  style: {
    transform: `translate(-${translate.x}px, -${translate.y}px) scale(${scale})`
  }
}))<MediaFrameProps>`
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

  const [baseSize, setBaseSize] = useState({ width: 0, height: 0 })
  const [prevPanPoint, setPrevPanPoint] = useState({ x: 0, y: 0 })
  const [zoomCenter, setZoomCenter] = useState({ x: 0, y: 0 })
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const [clientRect, setClientRect] = useState({ top: 0, left: 0 })
  const [panning, setPanning] = useState(false)

  const startPan = (e: React.MouseEvent) => setPrevPanPoint({ x: e.pageX, y: e.pageY })
  const transform = useCallback(
    (scaleDelta: number, translateXDelta: number, translateYDelta: number) => {
      const prevScale = scale
      const pinpoint = {
        x: zoomCenter.x - translate.x + translateXDelta,
        y: zoomCenter.y - translate.y + translateYDelta
      }

      const newScale = Math.min(MAX_SCALE, Math.max(1, scale + scaleDelta))
      setScale(newScale)

      setTranslate({
        x: Math.max(
          0,
          Math.min(
            baseSize.width * (newScale - 1),
            (zoomCenter.x / prevScale) * newScale - pinpoint.x
          )
        ),
        y: Math.max(
          0,
          Math.min(
            baseSize.height * (newScale - 1),
            (zoomCenter.y / prevScale) * newScale - pinpoint.y
          )
        )
      })
    },
    [scale, zoomCenter, translate, baseSize]
  )

  const movePan = useCallback(
    (e: MouseEvent) => {
      const currentPanPoint = { x: e.pageX, y: e.pageY }

      transform(0, currentPanPoint.x - prevPanPoint.x, currentPanPoint.y - prevPanPoint.y)
      setPrevPanPoint(currentPanPoint)
    },
    [prevPanPoint, transform]
  )

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setPanning(true)
    startPan(e)
  }

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!panning) return
      movePan(e)
    },
    [panning]
  )

  const onMouseUp = () => setPanning(false)

  const rootRef = createRef<HTMLDivElement>()

  const onZoom = useCallback(
    (pointX: number, pointY: number, scaleDelta: number) => {
      setZoomCenter({
        x: pointX - clientRect.left - translate.x,
        y: pointY - clientRect.top - translate.y
      })

      transform(scaleDelta, 0, 0)
    },
    [translate]
  )

  const onWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()
      onZoom(e.clientX, e.clientY, e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP)
    },
    [onZoom]
  )

  useEffect(() => {
    const rootElem = rootRef.current!
    const calcBaseSize = () => {
      setBaseSize({
        width: rootElem.clientWidth,
        height: rootElem.clientHeight
      })

      const { top, left } = rootElem.getBoundingClientRect()
      setClientRect({ top, left })
    }

    calcBaseSize()

    window.addEventListener('resize', calcBaseSize, false)
    document.addEventListener('mousemove', onMouseMove, false)
    document.addEventListener('mouseup', onMouseUp, false)
    rootElem.addEventListener('wheel', onWheel, false)

    return () => {
      window.removeEventListener('resize', calcBaseSize, false)
      document.removeEventListener('mousemove', onMouseMove, false)
      document.removeEventListener('mouseup', onMouseUp, false)
      rootElem.removeEventListener('wheel', onWheel, false)
    }
  }, [onMouseMove, onWheel])

  return (
    <ViewerRoot ref={rootRef} aspect={props.aspect}>
      <MediaFrame translate={translate} scale={scale} onMouseDown={onMouseDown}>
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
