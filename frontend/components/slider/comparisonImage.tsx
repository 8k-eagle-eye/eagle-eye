import React, { FC } from 'react'

export interface ImageProps {
  label?: string
  src: string
}

const Image: FC<ImageProps> = props => {
  return (
    <>
      <img src={props.src} alt={props.label} />
    </>
  )
}

export default Image
