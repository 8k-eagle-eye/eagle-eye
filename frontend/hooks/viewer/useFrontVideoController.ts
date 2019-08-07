import { useState, useRef, useCallback, useEffect } from 'react'

export default (src: string, playing: boolean, currentTime: number) => {
  const frontVideoRef = useRef<HTMLVideoElement>(null)
  const [canPlay, setCanPlay] = useState(false)

  useEffect(() => {
    const videoElem = frontVideoRef.current
    if (videoElem) {
      setCanPlay(false)
      // reactのバグでmutedをattrで指定できない
      videoElem.muted = true
      videoElem.load()
    }
  }, [src])

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

    if (Math.abs(videoElem.currentTime - currentTime) > 0.2) {
      videoElem.currentTime = currentTime
    }
  }, [currentTime, canPlay, frontVideoRef.current, src])

  return {
    ref: frontVideoRef,
    canPlay,
    setCanPlayOnCanPlayThrough: useCallback(() => setCanPlay(true), [])
  }
}
