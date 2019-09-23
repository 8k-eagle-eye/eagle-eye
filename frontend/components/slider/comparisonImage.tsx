import React from 'react'
import styled from 'styled-components'

export interface ComparisonImageProps {
  label?: string
  left?: number
  src: string
}

const Image = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
`

const ComparisonImage = (props: ComparisonImageProps) => <Image src={props.src} alt={props.label} />

ComparisonImage.defaultProps = {
  label: '',
  left: 0
}

export default ComparisonImage
