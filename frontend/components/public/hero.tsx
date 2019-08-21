import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import imageHomeHeroBg from 'assets/images/home/hero-bg.jpg'
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
  margin-bottom: 100px;
  padding-bottom: 80px;

  @media screen and (min-width: 576px) {
    margin-bottom: 150px;
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
`

const ViewerWrapper = styled.div`
  width: 90%;
  max-width: 960px;
  margin: 80px auto 0;
  position: relative;
`

const ViewerMask = styled.div`
  position: absolute;
  background: #0005;
  width: 100vw;
`

const WhiteShadowBox = styled.div`
  position: relative;
  box-shadow: 0 0 5px 3px rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  overflow: hidden;

  @media screen and (min-width: 576px) {
    box-shadow: 0 0 8px 5px rgba(255, 255, 255, 0.8);
    border-radius: 8px;
  }
`

const MaskPanels = () => {
  const styles = [
    {
      bottom: '100%',
      left: '50%',
      height: '100vh',
      transform: 'translateX(-50%)'
    },
    {
      top: '100%',
      left: '50%',
      height: '100vh',
      transform: 'translateX(-50%)'
    },
    {
      right: '100%',
      top: '50%',
      height: '100%',
      transform: 'translateY(-50%)'
    },
    {
      left: '100%',
      top: '50%',
      height: '100%',
      transform: 'translateY(-50%)'
    }
  ]

  return (
    <>
      {styles.map((style, i) => (
        <ViewerMask key={i} style={style} />
      ))}
    </>
  )
}

const Hero: FC<HeroProps> & { defaultProps: Partial<HeroProps> } = props => (
  <Section>
    <ModifiedContainer>
      <Heading as={props.headingLevel}>{props.heading}</Heading>
      <Description>{props.description}</Description>
      <ViewerWrapper>
        <MaskPanels />
        <WhiteShadowBox>
          <Viewer {...props.viewer} />
        </WhiteShadowBox>
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
