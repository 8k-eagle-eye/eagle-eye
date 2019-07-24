import { useState, createRef, useCallback, useEffect } from 'react'

export default (src: string, playing: boolean, currentTime: number) => {
  const frontVideoRef = createRef<HTMLVideoElement>()
  const [canPlay, setCanPlay] = useState(false)

  useEffect(() => setCanPlay(false), [src])

  useEffect(() => {
    const videoElem = frontVideoRef.current
    if (!videoElem || !canPlay) {
      return
    }

    if (playing && videoElem.paused) {
      videoElem.play()
    } else if (!playing && !videoElem.paused) {
      videoElem.pause()
    }
  }, [canPlay, frontVideoRef.current, playing])

  useEffect(() => {
    const videoElem = frontVideoRef.current
    if (!videoElem) {
      return
    }

    if (Math.abs(videoElem.currentTime - currentTime) > 0.5) {
      videoElem.currentTime = currentTime
    }
  }, [currentTime, canPlay, frontVideoRef.current, src])

  return {
    ref: frontVideoRef,
    canPlay,
    setCanPlayOnCanPlayThrough: useCallback(() => setCanPlay(true), [])
  }
}
