import { RefObject, useEffect } from 'react'

export default (videoRef: RefObject<HTMLVideoElement>, playing: boolean, currentTime: number) => {
  useEffect(() => {
    const videoElem = videoRef.current!

    if (playing) {
      videoElem.play()
    } else {
      videoElem.pause()
    }
  }, [playing, videoRef.current])

  useEffect(() => {
    const videoElem = videoRef.current
    if (!videoElem) {
      return
    }

    if (Math.abs(videoElem.currentTime - currentTime) > 0.5) {
      videoElem.currentTime = currentTime
    }
  }, [currentTime, videoRef.current])
}
