import React from 'react'

export interface ComparisonImageProps {
  label?: string
  src: string
}

const ComparisonImage = (props: ComparisonImageProps) => <img src={props.src} alt={props.label} />

ComparisonImage.defaultProps = {
  label: ''
}

export default ComparisonImage
