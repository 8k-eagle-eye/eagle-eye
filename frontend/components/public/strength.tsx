import React, { FC, HTMLAttributes } from 'react'
import { styled } from 'assets/styles/theme'

export interface StrengthProps extends HTMLAttributes<HTMLElement> {
  heading: string
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  image: {
    alt?: string
    src: string
  }
}

const Container = styled.div`
  display: flex;
  align-items: center;

  @media screen and (min-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`

const ImageWrapper = styled.p`
  width: 20%;

  @media screen and (min-width: 768px) {
    width: 40%;
  }
`

const Heading = styled.h3`
  width: 80%;
  padding-left: 1em;
  font-size: 1.4em;
  font-weight: bold;
  white-space: pre-line;

  @media screen and (min-width: 768px) {
    width: 100%;
    margin-top: 0.5em;
    padding-left: 0;
    font-size: 1.5em;
  }
`

const Strength: FC<StrengthProps> & { defaultProps: Partial<StrengthProps> } = props => (
  <Container>
    <ImageWrapper>
      <img src={props.image.src} alt={props.image.alt || ''} />
    </ImageWrapper>
    <Heading as={props.headingLevel}>{props.heading}</Heading>
  </Container>
)

Strength.defaultProps = {
  heading: 'Lorem ipsum',
  image: {
    src: 'https://placehold.jp/150x150.png'
  }
}

export default Strength
