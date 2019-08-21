import React from 'react'
import styled from 'styled-components'

interface PosterProps {
  src?: string
  onClick: () => void
}

const PosterFrame = styled.div<{ src?: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: ${({ src }) => (src ? `center/cover url(${src})` : 'none')};
`

const CircleButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  transform: translate(-50%, -50%) scale(0.75);
  border-radius: 50%;
  background: #fff;
  opacity: 0.8;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  ${PosterFrame}:hover > & {
    opacity: 1;
  }

  @media screen and (min-width: 576px) {
    transform: translate(-50%, -50%);
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

const Poster = ({ src, onClick }: PosterProps) => {
  return (
    <PosterFrame src={src} onClick={onClick}>
      <CircleButton>
        <ArrowMark />
      </CircleButton>
    </PosterFrame>
  )
}

export default Poster
