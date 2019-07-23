import React from 'react'
import styled from 'styled-components'

export interface FeatureProps {
  heading: string
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  description: string
  icon: {
    src: string
    alt?: string
  }
}

const Icon = styled.span`
  display: inline-block;
  width: 3rem;
  margin-bottom: 0.4em;
`

const Heading = styled.h3`
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 0.5em;
`

const Feature = (props: FeatureProps) => (
  <>
    {props.icon && (
      <Icon>
        <img src={props.icon.src} alt={props.icon.alt || ''} />
      </Icon>
    )}
    <Heading as={props.headingLevel && props.headingLevel}>{props.heading}</Heading>
    <p style={{ whiteSpace: 'pre-line' }}>{props.description}</p>
  </>
)

export default Feature
