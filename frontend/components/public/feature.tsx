import React from 'react'
import styled from 'styled-components'

export interface FeatureProps {
  heading: string
  description: string
  icon?: {
    src: string
    alt?: string
  }
}

const IconWrapper = styled.p`
  padding: 0 20%;
  margin-bottom: 2em;
`

const Caption = styled.h3`
  margin-bottom: 0.5em;
  text-align: center;
  font-weight: bold;

  &::after {
    content: '';
    display: block;
    width: 2.5em;
    height: 3px;
    margin: 0.5em auto 0;
    background-color: currentColor;
  }
`

const Feature = (props: FeatureProps) => (
  <>
    {props.icon && (
      <IconWrapper>
        <img src={props.icon.src} alt={props.icon.alt || ''} />
      </IconWrapper>
    )}
    <Caption>{props.heading}</Caption>
    <p className="text-center">{props.description}</p>
  </>
)

export default Feature
