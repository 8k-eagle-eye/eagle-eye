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
`

const ModifiedContainer = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 2rem;
`

const Heading = styled.h2`
  color: #fff;
  font-size: 10vw;
  font-weight: bold;
  white-space: pre-line;

  @media screen and (min-width: 576px) {
    font-size: 56px;
  }
`

const Description = styled.p`
  padding-top: 2em;
  color: rgb(255, 226, 53);
  font-size: 16px;
  white-space: pre-line;
`

const Hero: FC<HeroProps> & { defaultProps: Partial<HeroProps> } = props => (
  <Section style={props.style}>
    <ModifiedContainer>
      <Heading as={props.headingLevel}>{props.heading}</Heading>
      <Description>{props.description}</Description>
    </ModifiedContainer>
  </Section>
)

Hero.defaultProps = {
  heading: 'Lorem ipsum',
  description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, enim.
    Totam atque quisquam a. Molestiae nostrum impedit soluta quas eveniet suscipit in fugit odit, saepe odio fuga quisquam consectetur voluptatem.`
}

export default Hero
