import React, { useState, useCallback, createRef, useMemo } from 'react'
import styled from 'styled-components'

interface SeekBarProps {
  currentTime: number
  duration: number
  onSeekTime: (sec: number) => void
  onSeekStart: () => void
  onSeekEnd: () => void
}

interface ProgressBarProps {
  ratio: number
}

interface SeekableAreaProps {
  seeking: boolean
}

const Container = styled.div`
  position: absolute;
  height: 30px;
  top: 50%;
  left: 149px;
  right: 54px;
  transform: translateY(-50%);
`

const SeekBarFrame = styled.div`
  height: 10%;
  top: 45%;
  position: absolute;
  left: 0;
  right: 0;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.6);
  transition: 0.2s ease-in-out;

  ${Container}:hover > & {
    height: 20%;
    top: 40%;
  }
`

const ProgressBar = styled.div.attrs(({ ratio }: ProgressBarProps) => ({
  style: { width: `${ratio}%` }
}))<ProgressBarProps>`
  height: 100%;
  position: absolute;
  top: 0;
  background: #e60014;
  border-radius: 2px;
  left: 0;
`

const CircleButton = styled.div`
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background: linear-gradient(to right, #e83545 0%, #e60014 100%);
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translate(-50%, -50%);
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1) translate(-50%, -50%);
  }
`

const SeekableArea = styled.div.attrs(({ seeking }: SeekableAreaProps) => ({
  style: { display: seeking ? 'block' : 'none' }
}))<SeekableAreaProps>`
  position: absolute;
  height: 500px;
  bottom: 0;
  left: 0;
  width: 100%;
  cursor: pointer;
`

const SeekBar = (props: SeekBarProps) => {
  const { currentTime, duration, onSeekTime, onSeekStart, onSeekEnd } = props
  const containerRef = useMemo(() => createRef<HTMLDivElement>(), [])
  const [seeking, setSeeking] = useState(false)
  const onSeek = useCallback(
    (x: number) => {
      const target = containerRef.current!
      onSeekTime(((x - target.getBoundingClientRect().left) / target.clientWidth) * duration)
    },
    [seeking, duration]
  )

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (seeking) onSeek(e.clientX)
    },
    [onSeek, seeking]
  )

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (seeking) onSeek(e.touches[0].clientX)
    },
    [onSeek]
  )

  const setSeekingOnMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setSeeking(true)
      onSeek(e.clientX)
      onSeekStart()
    },
    [onSeekStart, onSeek]
  )

  const setSeekingOnTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault()
      setSeeking(true)
      onSeek(e.touches[0].clientX)
      onSeekStart()
    },
    [onSeekStart, onSeek]
  )

  const setSeekingOnSeekEnd = useCallback(() => {
    setSeeking(false)
    onSeekEnd()
  }, [onSeekEnd, currentTime])

  return (
    <Container ref={containerRef}>
      <SeekBarFrame onMouseDown={setSeekingOnMouseDown} onTouchStart={setSeekingOnTouchStart}>
        <ProgressBar ratio={(currentTime / duration) * 100}>
          <CircleButton />
        </ProgressBar>
      </SeekBarFrame>

      <SeekableArea
        seeking={seeking}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        onMouseUp={setSeekingOnSeekEnd}
        onTouchEnd={setSeekingOnSeekEnd}
      />
    </Container>
  )
}

export default SeekBar
