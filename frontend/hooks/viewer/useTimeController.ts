import { useEffect, useState, useCallback } from 'react'
import { TIMEUPDATE_INTERVAL_MSEC } from 'consts/viewer'

export default (duration: number) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [baseTimestamp, setBaseTimestamp] = useState(0)
  const [playing, setPlaying] = useState(false)

  const onSeekTime = useCallback((sec: number) => {
    setCurrentTime(sec)
    setBaseTimestamp(Date.now() - sec * 1000)
  }, [])

  const onPlay = useCallback(() => {
    setPlaying(true)
    setBaseTimestamp(Date.now() - currentTime * 1000)
  }, [currentTime])

  const onPause = useCallback(() => {
    setPlaying(false)
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!playing) {
        return
      }

      setCurrentTime(((Date.now() - baseTimestamp) / 1000) % duration)
    }, TIMEUPDATE_INTERVAL_MSEC)

    return () => clearInterval(intervalId)
  }, [playing, baseTimestamp, duration])

  return { playing, currentTime, onSeekTime, onPlay, onPause }
}
