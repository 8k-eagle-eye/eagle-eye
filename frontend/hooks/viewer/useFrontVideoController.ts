import { useState, useRef, useCallback, useEffect } from 'react'

export default (src: string, playing: boolean, currentTime: number) => {
  const frontVideoRef = useRef<HTMLVideoElement>(null)
  const [canPlay, setCanPlay] = useState(false)
  const [isDelayed, setIsDelayed] = useState(true)

  useEffect(() => {
    const videoElem = frontVideoRef.current
    if (videoElem) {
      setCanPlay(false)
      setIsDelayed(true)
      // reactのバグでmutedをJSXで指定できない
      videoElem.muted = true
      videoElem.load()
      videoElem.currentTime = currentTime + 0.25
    }
  }, [src])

  useEffect(() => {
    const videoElem = frontVideoRef.current
    if (!videoElem || !canPlay) return

    if (playing && videoElem.paused) {
      videoElem.play()
    } else if (!playing && !videoElem.paused) {
      videoElem.pause()
    }
  }, [canPlay, frontVideoRef.current, playing])

  const values = {
    currentTime,
    canPlay,
    frontVideoRef,
    playing
  }
  const refValues = useRef(values)

  refValues.current = values

  useEffect(() => {
    const intervalId = setInterval(() => {
      const { currentTime, canPlay, frontVideoRef, playing } = refValues.current
      const videoElem = frontVideoRef.current
      if (!videoElem || !canPlay) return

      const timeDiff = Math.abs(videoElem.currentTime - currentTime)
      let isDelayedTmp = false
      if (timeDiff > 0.25) {
        videoElem.currentTime = currentTime + 0.1
        isDelayedTmp = true
      } else if (timeDiff > 0.05) {
        videoElem.currentTime = currentTime
      }
      setIsDelayed(isDelayedTmp)

      if (!playing) videoElem.currentTime = currentTime
    }, 500)

    return () => clearInterval(intervalId)
  }, [])

  return {
    ref: frontVideoRef,
    canPlay,
    isDelayed,
    setCanPlayOnCanPlayThrough: useCallback(() => setCanPlay(true), [])
  }
}
