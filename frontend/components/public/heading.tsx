import React, { FC, HTMLAttributes } from 'react'
import { styled } from 'assets/styles/theme'

export interface HeadingProps extends HTMLAttributes<HTMLElement> {
  text: string
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const StyledHeading = styled.h2`
  margin-bottom: 0.5em;
  font-size: 20px;
  font-weight: bold;
  white-space: pre-line;

  @media screen and (min-width: 640px) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`

const Heading: FC<HeadingProps> & { defaultProps: Partial<HeadingProps> } = props => (
  <StyledHeading id={props.id}>{props.text}</StyledHeading>
)

Heading.defaultProps = {
  id: undefined,
  text: 'Lorem ipsum'
}

export default Heading
