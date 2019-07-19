import { RefObject, useEffect } from 'react'

export default (videoRef: RefObject<HTMLVideoElement>, playing: boolean) => {
  useEffect(() => {
    const videoElem = videoRef.current!

    if (playing) {
      videoElem.play()
    } else {
      videoElem.pause()
    }
  }, [playing])
}
