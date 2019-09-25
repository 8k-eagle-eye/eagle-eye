import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import imageHomeHeroBg from 'assets/images/home/hero-bg.jpg'
import imageIphone from 'assets/images/home/iphone.png'
import Viewer, { ViewerProps } from 'components/viewer'
import { styled } from 'assets/styles/theme'

export interface HeroProps {
  heading: string
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  description: string
  viewer: ViewerProps
}

const Section = styled.section`
  text-align: center;
  min-height: 100vh;
  background: top center / cover url(${imageHomeHeroBg});
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-bottom: 80px;

  @media screen and (min-width: 576px) {
    padding-bottom: 120px;
  }
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
  position: relative;
  z-index: 1;
  text-shadow: #0008 1px 1px 1px;

  @media screen and (min-width: 576px) {
    font-size: 56px;
  }
`

const Description = styled.p`
  padding-top: 2em;
  color: #fff;
  font-size: 16px;
  white-space: pre-line;
  position: relative;
  z-index: 1;
  text-shadow: #0008 1px 1px 1px;
`

const ViewerWrapper = styled.div`
  width: 70%;
  max-width: 960px;
  margin: 120px auto 0;
  position: relative;
`

const MobileImage = styled.div`
  background: center / cover no-repeat url(${imageIphone});
  position: absolute;
  left: -21.1%;
  right: -21.1%;
  top: -13.5%;
  bottom: -13.5%;
`

const Hero: FC<HeroProps> & { defaultProps: Partial<HeroProps> } = props => (
  <Section>
    <ModifiedContainer>
      <Heading as={props.headingLevel}>{props.heading}</Heading>
      <Description>{props.description}</Description>
      <ViewerWrapper>
        <MobileImage />
        <Viewer {...props.viewer} />
      </ViewerWrapper>
    </ModifiedContainer>
  </Section>
)

Hero.defaultProps = {
  heading: 'Lorem ipsum',
  description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, enim.
    Totam atque quisquam a. Molestiae nostrum impedit soluta quas eveniet suscipit in fugit odit, saepe odio fuga quisquam consectetur voluptatem.`
}

export default Hero
