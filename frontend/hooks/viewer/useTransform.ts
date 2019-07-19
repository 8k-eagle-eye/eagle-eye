import { useMemo, useState } from 'react'
import { MAX_SCALE } from 'consts/viewer'

export default (
  baseSize: { width: number; height: number },
  clientRect: { top: number; left: number },
  zoomPointX: number,
  zoomPointY: number,
  translateXDelta: number,
  translateYDelta: number,
  scaleDelta: number,
  deltaDetection: number
) => {
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const zoomCenter = useMemo(
    () => ({
      x: zoomPointX - clientRect.left + translate.x,
      y: zoomPointY - clientRect.top + translate.y
    }),
    [zoomPointX, zoomPointY]
  )

  return useMemo(() => {
    const newScale = Math.min(MAX_SCALE, Math.max(1, scale + scaleDelta))
    const pinpoint = {
      x: zoomCenter.x - translate.x + translateXDelta,
      y: zoomCenter.y - translate.y + translateYDelta
    }

    const newTranslate = {
      x: Math.max(
        0,
        Math.min(baseSize.width * (newScale - 1), (zoomCenter.x / scale) * newScale - pinpoint.x)
      ),
      y: Math.max(
        0,
        Math.min(baseSize.height * (newScale - 1), (zoomCenter.y / scale) * newScale - pinpoint.y)
      )
    }

    setScale(newScale)
    setTranslate(newTranslate)

    return {
      scale: newScale,
      translate: newTranslate
    }
  }, [baseSize, deltaDetection])
}
