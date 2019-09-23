import React from 'react'
import styled from 'styled-components'
import imageFeature1 from 'assets/images/home/feature1.jpg'

interface Feature1Props {
  scrollRatio: number
}

const maxZoom = 6

const ImageContainer = styled.div<Feature1Props>`
  height: 100%;
  background: center/cover url(${imageFeature1});
  transform: translateX(${({ scrollRatio }) => scrollRatio * 5}%)
    translateY(-${({ scrollRatio }) => scrollRatio * 80}%)
    scale(${({ scrollRatio }) => 1 + scrollRatio * maxZoom})
    rotateZ(-${({ scrollRatio }) => 90 * scrollRatio}deg);
`

const Feature1 = (props: Feature1Props) => <ImageContainer scrollRatio={props.scrollRatio} />

export default Feature1
