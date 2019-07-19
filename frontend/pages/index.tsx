import React from 'react'
import styled from 'styled-components'
import { Col, Container, Row } from 'react-bootstrap'
import Feature, { FeatureProps } from 'components/public/feature'
import Footer from 'components/public/footer'
import Head from 'components/head'
import Header from 'components/public/header'
import Hero from 'components/public/hero'
import Viewer from 'components/viewer'
import { ResetStyle } from 'assets/styles/globalStyle'
import { SITE_TITLE, APP_VERSION } from 'consts/meta'

interface FeaturesProps {
  features: FeatureProps[]
}

const dummyText = `
Lorem ipsum dolor, sit amet consectetur adipisicing elit.
Nostrum harum laudantium dicta laboriosam iste molestias totam
aperiam, iusto consectetur obcaecati, facilis velit, voluptatum
nisi sed. Vero molestias minus sequi voluptatem!
`

const featureContents = [...Array(3)].map(
  (_, idx): FeatureProps => ({
    heading: `heading ${++idx}`,
    description: dummyText,
    icon: { src: '/static/images/github.svg' }
  })
)

const ViewerSection = styled.section`
  text-align: center;
  margin-bottom: 30vw;

  @media screen and (min-width: 576px) {
    margin-bottom: 173px;
  }
`

const ViewerHeading = styled.h2`
  font-size: 10vw;
  font-weight: bold;
  margin-bottom: 1em;

  @media screen and (min-width: 640px) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`

const ViewerFrame = styled.div`
  overflow: hidden;
  border-radius: 8px;
  margin: 0 auto 2em;
  background-color: ${({ theme: { color } }) => color.primaryDark};
  max-width: 640px;
`

const FeaturesSection = styled.section`
  position: relative;
  overflow-x: hidden;
  padding-top: 6vw;
  background-color: ${({ theme }) => theme.color.primaryLight};
  background-clip: content-box;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 1px;
    z-index: -1;
    display: block;
    height: 0;
    width: 0;
    border-style: solid;
  }

  &::before {
    right: 0;
    border-color: transparent transparent ${({ theme }) => theme.color.primaryDark} transparent;
    border-width: 0 0 6vw 100vw;
  }

  &::after {
    left: 0;
    border-color: transparent transparent transparent ${({ theme }) => theme.color.primaryLight};
    border-width: 6vw 0 0 100vw;
  }
`

const Features = (props: FeaturesProps) => (
  <FeaturesSection>
    <Container>
      <h2 className="font-weight-bold text-center mt-5 mb-md-5">Features</h2>
      <Row>
        {props.features.map(({ heading, description, icon }) => (
          <Col key={heading} md className="mt-5 mt-md-0">
            <Feature heading={heading} description={description} icon={icon} />
          </Col>
        ))}
      </Row>
    </Container>
  </FeaturesSection>
)

const Home = () => (
  <div>
    <Head title={SITE_TITLE} />
    <ResetStyle />
    <Header title={SITE_TITLE} version={APP_VERSION} />

    <Hero
      heading="Application Concept, Copy etc..."
      description={dummyText}
      linkButtons={[
        { href: '#demonstration', text: 'Demonstration' },
        { href: 'https://github.com/8k-eagle-eye/eagle-eye', text: 'GitHub' }
      ]}
    />

    <ViewerSection>
      <Container>
        <ViewerHeading id="demonstration">Demonstration</ViewerHeading>
        <ViewerFrame>
          <Viewer aspect={16 / 9} />
        </ViewerFrame>
        <p>{dummyText}</p>
      </Container>
    </ViewerSection>

    <Features features={featureContents} />

    <Footer
      className="pt-5"
      style={{
        backgroundColor: 'var(--color-primary-light)'
      }}
    />
  </div>
)

export default Home
