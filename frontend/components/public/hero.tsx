import React from 'react'
import { Container } from 'react-bootstrap'
import Heading from 'components/public/heading'
import { styled } from 'assets/styles/theme'

export interface HeroProps {
  heading: string
  src: string
  description?: string
}

const HeroSection = styled.section`
  position: relative;
  margin-bottom: 30vw;
  padding-top: 30vw;

  @media screen and (min-width: 576px) {
    margin-bottom: 173px;
    padding-top: 173px;
  }
`

const HeroDescription = styled.p`
  margin-bottom: 1.2rem;
  color: ${({ theme }) => theme.color.gray};
  white-space: pre-line;
`

const DescriptionImg = styled.img`
  display: block;
  max-width: 80%;
  margin: 72px auto 0;
  box-shadow: -5px 10px 30px 0px rgba(0, 0, 0, 0.4);
`

const Hero = (props: HeroProps) => (
  <HeroSection>
    <Container className="text-md-center">
      <Heading text={props.heading} />
      {props.description && <HeroDescription>{props.description}</HeroDescription>}
    </Container>
    <DescriptionImg src={props.src} />
  </HeroSection>
)

export default Hero
