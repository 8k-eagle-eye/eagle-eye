import { useMemo } from 'react'

export default (
  baseSize: { width: number; height: number },
  scale: number,
  translate: { x: number; y: number }
) =>
  useMemo(() => {
    const resolutionRatio = scale >= 8 ? 8 : scale >= 4 ? 4 : scale >= 2 ? 2 : 1
    const blockSize = {
      width: (baseSize.width * scale) / resolutionRatio / 2,
      height: (baseSize.height * scale) / resolutionRatio / 2
    }
    const left = (translate.x - (translate.x % blockSize.width)) / scale
    const top = (translate.y - (translate.y % blockSize.height)) / scale
    const src = `${process.env.STORAGE_ORIGIN}/videos/${resolutionRatio}k/${Math.round(
      (top * scale) / blockSize.height
    ) + 1}-${Math.round((left * scale) / blockSize.width) + 1}.mp4`

    return { resolutionRatio, top, left, src }
  }, [baseSize, scale, translate])
