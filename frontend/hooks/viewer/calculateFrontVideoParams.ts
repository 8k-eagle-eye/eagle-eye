import { useMemo } from 'react'

export default (
  gridSize: { width: number; height: number },
  resolutionRatio: number,
  scale: number,
  finallyTranslate: { x: number; y: number }
) =>
  useMemo(() => {
    const left = (finallyTranslate.x - (finallyTranslate.x % gridSize.width)) / scale
    const top = (finallyTranslate.y - (finallyTranslate.y % gridSize.height)) / scale
    const src = `${process.env.STORAGE_ORIGIN}/videos/${resolutionRatio}k/${Math.round(
      (top * scale) / gridSize.height
    ) + 1}-${Math.round((left * scale) / gridSize.width) + 1}.mp4`

    return { top, left, src }
  }, [gridSize, finallyTranslate])
