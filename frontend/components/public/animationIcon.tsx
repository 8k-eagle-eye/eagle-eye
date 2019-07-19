import React from 'react'
import styled from 'styled-components'

export interface AnimationIconProps {
  text?: string
}

export const Icon = styled.div`
  position: relative;
  min-width: 5em;
  padding-top: 3em;

  &::after {
    content: attr(data-text);
    color: rgba(255, 255, 255, 0.8);
    font-weight: bold;
  }

  svg {
    position: absolute;
    top: 0;
    right: 0;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    width: 3em;
    margin: 0 auto;
  }

  .left {
    left: -2em;
    animation-name: fade-out-left;
  }

  .right {
    left: 2em;
    animation-name: fade-out-right;
  }

  @keyframes fade-out-left {
    0% {
      fill: rgba(255, 255, 255, 0.8);
      top: 0;
      left: -2em;
    }
    50%,
    to {
      fill: rgba(255, 255, 255, 0);
      top: 0.5em;
      left: -4em;
    }
  }

  @keyframes fade-out-right {
    0% {
      fill: rgba(255, 255, 255, 0.8);
      top: 0;
      left: 2em;
    }
    50%,
    to {
      fill: rgba(255, 255, 255, 0);
      top: -0.5em;
      left: 4em;
    }
  }
`

const AnimationIcon = (props: AnimationIconProps) => (
  <Icon data-text={props.text ? props.text : ''}>
    <svg role="img" viewBox="0 0 14 11" xmlns="http://www.w3.org/2000/svg" className="right">
      <path d="M14 0L7 11L0 0L14 0Z"></path>
    </svg>
    <svg role="img" viewBox="0 0 14 11" xmlns="http://www.w3.org/2000/svg" className="left">
      <path d="M14 11L7 0L0 11L14 11Z"></path>
    </svg>
  </Icon>
)

export default AnimationIcon
