import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

export interface HeadingProps extends HTMLAttributes<HTMLElement> {
  text: string
}

const Heading = styled.h2`
  margin-bottom: 0.5em;
  font-size: 10vw;
  font-weight: bold;

  @media screen and (min-width: 640px) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`

const heading = (props: HeadingProps) => <Heading {...props}>{props.text}</Heading>

export default heading
