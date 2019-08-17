import React from 'react'
import ComparisonImage, { ComparisonImageProps } from 'components/slider/comparisonImage'

export interface SliderContainerProps {
  aspect?: number
  leftImage: ComparisonImageProps
  rightImage: ComparisonImageProps
}

const SliderContainer = (props: SliderContainerProps) => {
  return (
    <>
      <ComparisonImage {...props.leftImage} />
      <ComparisonImage {...props.rightImage} />
    </>
  )
}

SliderContainer.defaultProps = {
  aspect: 1.78
}

export default SliderContainer
