import React from 'react'
import styled from 'styled-components'
import useFrontVideoParams from 'hooks/viewer/useFrontVideoParams'
import useFrontVideoController from 'hooks/viewer/useFrontVideoController'

interface FrontVideoProps {
  playing: boolean
  currentTime: number
  baseSize: { width: number; height: number }
  scale: number
  translate: { x: number; y: number }
}

interface FrontVideoElemProps {
  sizeRatio: number
  top: number
  left: number
  opacity: number
}

const FrontVideoElem = styled.video.attrs(
  ({ sizeRatio, top, left, opacity }: FrontVideoElemProps) => ({
    style: {
      width: `${sizeRatio}%`,
      height: `${sizeRatio}%`,
      top: `${top}px`,
      left: `${left}px`,
      opacity
    }
  })
)<FrontVideoElemProps>`
  position: absolute;
`

const FrontVideo = (props: FrontVideoProps) => {
  const { playing, currentTime, baseSize, scale, translate } = props
  const { resolutionRatio, top, left, src } = useFrontVideoParams(baseSize, scale, translate)
  const { ref, canPlay, onCanPlayThrough } = useFrontVideoController(
    resolutionRatio,
    src,
    playing,
    currentTime
  )

  return resolutionRatio === 1 ? null : (
    <FrontVideoElem
      ref={ref}
      sizeRatio={100 / resolutionRatio}
      top={top}
      left={left}
      opacity={canPlay ? 1 : 0}
      src={src}
      onCanPlayThrough={onCanPlayThrough}
      loop
      playsInline
      muted
    />
  )
}

export default FrontVideo
