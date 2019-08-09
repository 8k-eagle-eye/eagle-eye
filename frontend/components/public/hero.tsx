import React, { FC, HTMLAttributes } from 'react'
import { Container } from 'react-bootstrap'
import imageHomeHeroBg from 'assets/images/home-hero-bg.jpg'
import { styled } from 'assets/styles/theme'

export interface HeroProps extends HTMLAttributes<HTMLElement> {
  heading: string
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  description: string
}

const Section = styled.section`
  text-align: center;
  min-height: 100vh;
  background: linear-gradient(#012b, #012b), left center / cover url(${imageHomeHeroBg});
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 146px;
`

const Heading = styled.h2`
  padding-top: 2rem;
  color: #fff;
  font-size: 10vw;
  font-weight: bold;
  white-space: pre-line;

  @media screen and (min-width: 576px) {
    font-size: 60px;
  }

  @media screen and (min-width: 768px) {
    font-size: 64px;
  }
`

const Description = styled.p`
  padding-top: 2em;
  padding-bottom: 2rem;
  color: rgb(255, 226, 53);
  font-size: 5vw;
  white-space: pre-line;

  @media screen and (min-width: 400px) {
    font-size: 20px;
  }
`

const Hero: FC<HeroProps> & { defaultProps: Partial<HeroProps> } = props => (
  <Section style={props.style}>
    <Container>
      <Heading as={props.headingLevel}>{props.heading}</Heading>
      <Description>{props.description}</Description>
    </Container>
  </Section>
)

Hero.defaultProps = {
  heading: 'Lorem ipsum',
  description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, enim.
    Totam atque quisquam a. Molestiae nostrum impedit soluta quas eveniet suscipit in fugit odit, saepe odio fuga quisquam consectetur voluptatem.`
}

export default Hero
