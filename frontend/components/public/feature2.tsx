import React from 'react'
import styled from 'styled-components'
import imageFeature2High from 'assets/images/home/feature2-high.jpg'
import imageFeature2Low from 'assets/images/home/feature2-low.jpg'

interface Feature2Props {
  scrollRatio: number
}

const ImageContainer = styled.div<{ url: string }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  background: center/cover url(${({ url }) => url});
`

const Slider = styled.div<{ scrollRatio: number }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${({ scrollRatio }) => scrollRatio * 100}%;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: #fff;
  }
`

const Feature2 = (props: Feature2Props) => {
  return (
    <>
      <ImageContainer url={imageFeature2Low} />
      <Slider scrollRatio={props.scrollRatio}>
        <ImageContainer url={imageFeature2High} />
      </Slider>
    </>
  )
}

export default Feature2
