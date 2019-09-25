import React, { useState, useEffect, useRef, useMemo, cloneElement, ReactElement } from 'react'
import styled from 'styled-components'

export interface FixedScrollProps {
  children?: ReactElement
  vhTimes: number
  heading: string
  caption: string
}

const Root = styled.div<{ vhTimes: number }>`
  height: ${({ vhTimes }) => vhTimes * 100}vh;
`

const Container = styled.div<{ vhTimes: number; vh: number; rectTop: number }>`
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  left: 0;
  top: ${({ vhTimes, vh, rectTop }) =>
    rectTop > vh
      ? '100%'
      : rectTop > 0
      ? `${rectTop}px`
      : rectTop > vh * (1 - vhTimes)
      ? 0
      : `${rectTop + vh * (vhTimes - 1)}px`};
`

const TextBox = styled.div`
  position: absolute;
  width: 80%;
  max-width: 960px;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #fff;
  text-shadow: #0008 1px 1px 1px;
`

const Heading = styled.h2`
  margin-bottom: 0.5em;
  font-size: 20px;
  font-weight: bold;
  white-space: pre-line;

  @media screen and (min-width: 640px) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`

const Caption = styled.p`
  margin-bottom: 1.2rem;
  white-space: pre-line;
`

const FixedScroll = (props: FixedScrollProps) => {
  const [rectTop, setRectTop] = useState(2)
  const [vh, setVh] = useState(1)
  const scrollRatio = useMemo(() => Math.max(0, Math.min(1, rectTop / vh / (1 - props.vhTimes))), [
    props.vhTimes,
    rectTop,
    vh
  ])
  const rootRef = useRef<HTMLDivElement>(null)
  const elementWithProps = useMemo(() => cloneElement(props.children!, { scrollRatio }), [
    props.children,
    scrollRatio
  ])

  useEffect(() => {
    const onScroll = () => setRectTop(rootRef.current!.getBoundingClientRect().top)
    const onResize = () => {
      onScroll()
      setVh(window.innerHeight)
    }

    window.addEventListener('scroll', onScroll, false)
    window.addEventListener('resize', onResize, false)

    onResize()

    return () => {
      window.removeEventListener('scroll', onScroll, false)
      window.removeEventListener('resize', onResize, false)
    }
  })

  return (
    <Root ref={rootRef} vhTimes={props.vhTimes}>
      <Container vhTimes={props.vhTimes} vh={vh} rectTop={rectTop}>
        {elementWithProps}
        <TextBox>
          <Heading>{props.heading}</Heading>
          <Caption>{props.caption}</Caption>
        </TextBox>
      </Container>
    </Root>
  )
}

export default FixedScroll
