// ref: https://github.com/zeit/next.js/blob/canary/examples/with-mobx/components/Clock.js
import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  padding: 15px;
  color: #82fa58;
  display: inline-block;
  font: 50px menlo, monaco, monospace;
  background-color: #000;

  &.light {
    background-color: #999;
  }
`

const pad = (n: number) => (n < 10 ? `0${n}` : n)

const format = (t: Date) =>
  `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(t.getUTCSeconds())}`

export default function Clock(props: { light?: boolean; lastUpdate: number }) {
  return (
    <StyledDiv className={props.light ? 'light' : ''}>
      {format(new Date(props.lastUpdate))}
    </StyledDiv>
  )
}
