import React from 'react'
import styled from 'styled-components'
// Todo: import playIconSrc from 'assets/images/viewer/play.svg'
// import pauseIconSrc from 'assets/images/viewer/pause.svg'

const playIconSrc = '/static/images/viewer/play.svg'
const pauseIconSrc = '/static/images/viewer/pause.svg'

interface ControlsBarProps {
  playing: boolean
  onTogglePlaying: () => void
}

const ControlsRoot = styled.div<{ visible: boolean }>`
  height: 54px;
  position: absolute;
  width: 100%;
  left: 0;
  bottom: ${({ visible }) => (visible ? 0 : -54)}px;
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

const ControlsBar = (props: ControlsBarProps) => {
  const { playing, onTogglePlaying } = props

  return (
    <ControlsRoot visible={true}>
      <PlayingIconFrame playing={playing} onClick={onTogglePlaying}>
        <PlayOrPauseIconImg src={playing ? pauseIconSrc : playIconSrc} />
      </PlayingIconFrame>
    </ControlsRoot>
  )
}

export default ControlsBar
