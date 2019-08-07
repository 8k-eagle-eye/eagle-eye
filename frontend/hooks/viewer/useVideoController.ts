import { useRef, useEffect, useState, useCallback } from 'react'

export default () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  const onPlay = useCallback(() => setPlaying(true), [])
  const onPause = useCallback(() => setPlaying(false), [])
  const changeCurrentTimeOnSeek = useCallback(
    (t: number) => {
      videoRef.current!.currentTime = t
    },
    [videoRef.current]
  )
  const setCurrentTimeOnTimeupdate = useCallback(
    () => setCurrentTime(videoRef.current!.currentTime),
    []
  )

  useEffect(() => {
    const videoElem = videoRef.current
    if (!videoElem) return

    if (playing) {
      videoElem.play()
    } else {
      videoElem.pause()
    }
  }, [playing, videoRef.current])

  useEffect(() => {
    const videoElem = videoRef.current
    if (!videoElem) return

    videoElem.addEventListener('timeupdate', setCurrentTimeOnTimeupdate, false)

    return () => videoElem.removeEventListener('timeupdate', setCurrentTimeOnTimeupdate, false)
  }, [videoRef.current])

  return { videoRef, currentTime, changeCurrentTimeOnSeek, playing, onPlay, onPause }
}
