import React from 'react'
import SliderContainer, { SliderContainerProps } from 'components/slider/sliderContainer'

interface Content {
  slider: SliderContainerProps
}

const content: Content = {
  slider: {
    leftImage: {
      label: 'Left',
      src: 'https://www.pakutaso.com/shared/img/thumb/AME19716065_TP_V4.jpg'
    },
    rightImage: {
      label: 'Right',
      src: 'https://www.pakutaso.com/shared/img/thumb/KM19730025_TP_V4.jpg'
    }
  }
}

const SliderPage = () => (
  <>
    <h1>Images Compare</h1>
    <SliderContainer {...content.slider} />
  </>
)

export default SliderPage
