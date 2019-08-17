import React, { FC } from 'react'
import Image, { ImageProps } from 'components/slider/image'

export interface SliderContainerProps {
  aspect?: number
  leftImage: ImageProps
  rightImage: ImageProps
}

const SliderContainer: FC<SliderContainerProps> = props => {
  return (
    <>
      <Image {...props.leftImage} />
      <Image {...props.rightImage} />
    </>
  )
}

export default SliderContainer
