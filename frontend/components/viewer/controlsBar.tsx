import React, { useMemo, useState, useCallback } from 'react'
import styled from 'styled-components'
import timeToText from 'libs/viewer/timeToText'
import SeekBar from './seekBar'
import pauseIconSrc from 'assets/images/viewer/pause.svg'
import playIconSrc from 'assets/images/viewer/play.svg'

interface ControlsBarProps {
  playing: boolean
  currentTime: number
  duration: number
  onSeekTime: (sec: number) => void
  onTogglePlaying: () => void
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

const PlayingIconFrame = styled.div<{ playing: boolean }>`
  width: ${({ playing }) => (playing ? 28 : 32)}px;
  height: 32px; /* specify the height for IE11 */
  margin-left: ${({ playing }) => (playing ? 12 : 10)}px;
  cursor: pointer;
  opacity: 0.8;
  position: relative;
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    opacity: 1;
  }
`

const PlayOrPauseIconImg = styled.img`
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

const ControlsBar = (props: ControlsBarProps) => {
  const { playing, onTogglePlaying, currentTime, duration, onSeekTime } = props
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
      <PlayingIconFrame playing={playing} onClick={onTogglePlaying}>
        <PlayOrPauseIconImg src={playing ? pauseIconSrc : playIconSrc} />
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
