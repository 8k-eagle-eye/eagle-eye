import React, { useMemo } from 'react'
import styled from 'styled-components'
import calculateFrontVideoParams from 'hooks/viewer/calculateFrontVideoParams'
import useFrontVideoController from 'hooks/viewer/useFrontVideoController'
import getVideoSrc from 'libs/viewer/getVideoSrc'

interface FrontVideoProps {
  baseUrl: string
  playing: boolean
  currentTime: number
  scale: number
  gridSize: { x: number; y: number }
  resolutionRatio: number
  destinationTranslate: { x: number; y: number }
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
      top: `${top * 100}%`,
      left: `${left * 100}%`,
      opacity
    }
  })
)<FrontVideoElemProps>`
  position: absolute;
`

const FrontVideo = (props: FrontVideoProps) => {
  const {
    baseUrl,
    playing,
    currentTime,
    scale,
    gridSize,
    resolutionRatio,
    destinationTranslate
  } = props
  const { top, left, gridIndexTop, gridIndexLeft } = calculateFrontVideoParams(
    gridSize,
    scale,
    destinationTranslate
  )
  const src = useMemo(
    () => getVideoSrc({ baseUrl, resolutionRatio, gridIndexTop, gridIndexLeft }),
    [baseUrl, resolutionRatio, gridIndexTop, gridIndexLeft]
  )
  const { ref, canPlay, setCanPlayOnCanPlayThrough } = useFrontVideoController(
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
      onCanPlayThrough={setCanPlayOnCanPlayThrough}
      loop
      playsInline
      muted
    />
  )
}

export default FrontVideo
