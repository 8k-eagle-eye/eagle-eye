import React, { useMemo, useState, useCallback } from 'react'
import styled from 'styled-components'
import timeToText from 'libs/viewer/timeToText'
import SeekBar from './seekBar'
import pauseIconSrc from 'assets/images/viewer/pause.svg'
import playIconSrc from 'assets/images/viewer/play.svg'
import onFullScreenIconSrc from 'assets/images/viewer/onFullScreen.svg'
import offFullScreenIconSrc from 'assets/images/viewer/offFullScreen.svg'

interface ControlsBarProps {
  playing: boolean
  currentTime: number
  duration: number
  isFullScreen: boolean
  onSeekTime: (sec: number) => void
  onTogglePlaying: () => void
  onToggleFullScreen: () => void
}

const ControlsRoot = styled.div`
  height: 54px;
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  transition: 0.3s ease-in-out;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.05));
`

const IconFrame = styled.div`
  cursor: pointer;
  opacity: 0.8;
  position: relative;
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    opacity: 1;
  }
`

const PlayingIconFrame = styled(IconFrame)<{ playing: boolean }>`
  width: ${({ playing }) => (playing ? 28 : 32)}px;
  height: 32px; /* specify the height for IE11 */
  margin-left: ${({ playing }) => (playing ? 12 : 10)}px;
`

const IconImg = styled.img`
  width: 100%;
  height: 100%;
  vertical-align: bottom;
`

const TimeText = styled.div`
  position: absolute;
  font-size: 12px;
  margin-top: 1px;
  top: 50%;
  left: 49px;
  transform: translateY(-50%);
  color: #fff;
`

const FullScreenIconFrame = styled(IconFrame)`
  float: right;
  width: 24px;
  height: 24px;
  margin-right: 15px;
`

const ControlsBar = (props: ControlsBarProps) => {
  const {
    playing,
    onTogglePlaying,
    currentTime,
    duration,
    onSeekTime,
    isFullScreen,
    onToggleFullScreen
  } = props
  const [playingBeforeSeeking, setPlayingBeforeSeeking] = useState(false)

  const onSeekStart = useCallback(() => {
    setPlayingBeforeSeeking(playing)
    if (playing) onTogglePlaying()
  }, [playing, onTogglePlaying])

  const onSeekEnd = useCallback(() => {
    if (playingBeforeSeeking) onTogglePlaying()
  }, [playingBeforeSeeking, onTogglePlaying])

  const timeText = useMemo(() => `${timeToText(currentTime)} / ${timeToText(duration)}`, [
    currentTime,
    duration
  ])

  return (
    <ControlsRoot>
      <FullScreenIconFrame onClick={onToggleFullScreen}>
        <IconImg src={isFullScreen ? offFullScreenIconSrc : onFullScreenIconSrc} />
      </FullScreenIconFrame>

      <PlayingIconFrame playing={playing} onClick={onTogglePlaying}>
        <IconImg src={playing ? pauseIconSrc : playIconSrc} />
      </PlayingIconFrame>

      <TimeText>{timeText}</TimeText>

      <SeekBar
        currentTime={currentTime}
        duration={duration}
        onSeekTime={onSeekTime}
        onSeekStart={onSeekStart}
        onSeekEnd={onSeekEnd}
      />
    </ControlsRoot>
  )
}

export default ControlsBar
