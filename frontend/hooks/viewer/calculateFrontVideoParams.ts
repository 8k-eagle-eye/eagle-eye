import { useMemo } from 'react'

export default (
  gridSize: { x: number; y: number },
  scale: number,
  destinationTranslate: { x: number; y: number }
) =>
  useMemo(() => {
    const left = (destinationTranslate.x - (destinationTranslate.x % gridSize.x)) / scale
    const top = (destinationTranslate.y - (destinationTranslate.y % gridSize.y)) / scale

    return {
      top,
      left,
      gridIndexTop: Math.round((top * scale) / gridSize.y),
      gridIndexLeft: Math.round((left * scale) / gridSize.x)
    }
  }, [gridSize, destinationTranslate])
