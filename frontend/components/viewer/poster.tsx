import React from 'react'
import styled from 'styled-components'
import getPosterSrc from 'libs/viewer/getPosterSrc'

interface PosterProps {
  baseUrl: string
  onClick: () => void
}

const PosterFrame = styled.div<{ baseUrl: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: center/cover url(${({ baseUrl }) => getPosterSrc(baseUrl)});
`

const CircleButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: #fff;
  opacity: 0.8;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 1;
  }
`

const ArrowMark = styled.div`
  position: absolute;
  top: 50%;
  left: 28px;
  border: solid transparent;
  border-width: 18px 32px;
  border-left-color: #333;
  transform: translateY(-50%);
`

const Poster = ({ baseUrl, onClick }: PosterProps) => {
  return (
    <PosterFrame baseUrl={baseUrl}>
      <CircleButton onClick={onClick}>
        <ArrowMark />
      </CircleButton>
    </PosterFrame>
  )
}

export default Poster
