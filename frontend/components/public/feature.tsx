import React, { FC } from 'react'
import Heading from 'components/public/heading'
import { styled } from 'assets/styles/theme'

export interface FeatureProps {
  heading: string
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  caption?: string
  image: {
    alt?: string
    src: string
  }
}

const Caption = styled.p`
  margin-bottom: 1.2rem;
  color: ${({ theme }) => theme.color.gray};
  white-space: pre-line;
`

const ImageWrapper = styled.p`
  margin-top: 36px;

  @media screen and (min-width: 576px) {
    margin-top: 72px;
  }
`

const Image = styled.img`
  width: 100%;
  box-shadow: -5px 10px 30px 0px rgba(0, 0, 0, 0.4);
`

const Feature: FC<FeatureProps> & { defaultProps: Partial<FeatureProps> } = props => (
  <>
    <Heading text={props.heading} />
    {props.caption && <Caption>{props.caption}</Caption>}
    <ImageWrapper>
      <Image src={props.image.src} alt={props.image.alt || ''} />
    </ImageWrapper>
  </>
)

export default Feature

Feature.defaultProps = {
  heading: 'Lorem ipsum',
  image: {
    src: 'https://placehold.jp/150x150.png'
  }
}
