import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import ComparisonImage, { ComparisonImageProps } from 'components/slider/comparisonImage'
import Separator from 'components/slider/separator'

export interface SliderContainerProps {
  aspect?: number
  leftImage: ComparisonImageProps
  rightImage: ComparisonImageProps
}

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  overflow: hidden;
`

const LeftImage = styled.div`
  display: block;
  will-change: clip;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  pointer-events: none;
  overflow: hidden;
`

const RightImage = styled.div`
  display: block;
  pointer-events: none;
`

const SliderContainer = (props: SliderContainerProps) => {
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0 })
  const [left, setLeft] = useState(0)
  const rightImageRef = useRef<HTMLDivElement>(null)
  const updateLeft = (left: number) => {
    setLeft(left)
  }
  useEffect(() => {
    const viewerElem = rightImageRef.current!
    const { clientWidth, clientHeight } = viewerElem
    setBaseSize({ width: clientWidth, height: clientHeight })
    setLeft(clientWidth / 2)
  }, [])
  return (
    <Wrapper>
      <LeftImage style={{ clip: `rect(0, ${left}px, ${baseSize.height}px, 0)` }}>
        <ComparisonImage {...props.leftImage} />
      </LeftImage>
      <Separator left={left} updateLeft={updateLeft} />
      <RightImage ref={rightImageRef}>
        <ComparisonImage {...props.rightImage} />
      </RightImage>
    </Wrapper>
  )
}

SliderContainer.defaultProps = {
  aspect: 1.78
}

export default SliderContainer
