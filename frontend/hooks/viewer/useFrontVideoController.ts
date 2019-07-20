import { useState, createRef, useCallback, useMemo, useEffect } from 'react'

export default (resolutionRatio: number, src: string, playing: boolean, currentTime: number) => {
  const [videoElem, setVideoElem] = useState<HTMLVideoElement | null>(null)
  const frontVideoRef = createRef<HTMLVideoElement>()
  const [canPlay, setCanPlay] = useState(false)

  useMemo(() => setCanPlay(false), [src])

  useMemo(() => {
    if (!videoElem || !canPlay) {
      return
    }

    if (playing && videoElem.paused) {
      videoElem.play()
    } else if (!playing && !videoElem.paused) {
      videoElem.pause()
    }
  }, [canPlay, playing, videoElem])

  useMemo(() => {
    if (!videoElem) {
      return
    }

    if (Math.abs(videoElem.currentTime - currentTime) > 0.5) {
      videoElem.currentTime = currentTime
    }
  }, [currentTime, videoElem, canPlay, src])

  useEffect(() => {
    const frontVideoElem = frontVideoRef.current
    if (!frontVideoElem) {
      return
    }

    setVideoElem(frontVideoElem)
  }, [resolutionRatio, frontVideoRef.current])

  return { ref: frontVideoRef, canPlay, onCanPlayThrough: useCallback(() => setCanPlay(true), []) }
}
