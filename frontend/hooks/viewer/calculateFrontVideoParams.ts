import { useMemo } from 'react'

export default (
  gridSize: { width: number; height: number },
  scale: number,
  destinationTranslate: { x: number; y: number }
) =>
  useMemo(() => {
    const left = (destinationTranslate.x - (destinationTranslate.x % gridSize.width)) / scale
    const top = (destinationTranslate.y - (destinationTranslate.y % gridSize.height)) / scale

    return {
      top,
      left,
      gridIndexTop: Math.round((top * scale) / gridSize.height),
      gridIndexLeft: Math.round((left * scale) / gridSize.width)
    }
  }, [gridSize, destinationTranslate])
