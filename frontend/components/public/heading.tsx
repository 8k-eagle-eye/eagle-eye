import React, { HTMLAttributes } from 'react'
import { styled } from 'assets/styles/theme'

export interface HeadingProps extends HTMLAttributes<HTMLElement> {
  text: string
}

const HeadingElement = styled.h2`
  margin-bottom: 0.5em;
  font-size: 20px;
  font-weight: bold;

  @media screen and (min-width: 640px) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`

const Heading = (props: HeadingProps) => <HeadingElement {...props}>{props.text}</HeadingElement>

export default Heading
