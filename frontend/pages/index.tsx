import React from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import AnimationIcon from 'components/public/animationIcon'
import FeatureList, { FeatureListProps } from 'components/public/featureList'
import Footer from 'components/public/footer'
import Head from 'components/head'
import Header from 'components/public/header'
import Heading from 'components/public/heading'
import Hero from 'components/public/hero'
import Viewer from 'components/viewer'
import { ResetStyle, BackgroundStyle } from 'assets/styles/globalStyle'
import { SITE_TITLE, APP_VERSION } from 'consts/meta'

const dummyText = `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
Nostrum harum laudantium dicta laboriosam iste molestias totam
aperiam, iusto consectetur obcaecati, facilis velit, voluptatum
nisi sed. Vero molestias minus sequi voluptatem!
`

const featureContents: FeatureListProps = {
  items: [...Array(3)].map((_, idx) => ({
    heading: `heading ${++idx}`,
    description: dummyText,
    icon: { src: '/static/images/github.svg' }
  }))
}

const ViewerSection = styled.section`
  text-align: center;
  margin-bottom: 30vw;

  @media screen and (min-width: 576px) {
    margin-bottom: 173px;
  }
`

const ViewerFrame = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  margin: 0 auto 2em;
  background-color: ${({ theme: { color } }) => color.primaryDark};
  max-width: 640px;

  .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
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

const Home = () => (
  <div>
    <Head title={SITE_TITLE} />
    <ResetStyle />
    <BackgroundStyle />

    <Header title={SITE_TITLE} version={APP_VERSION} />

    <Hero
      heading="Application Concept, Copy etc..."
      description={dummyText}
      linkList={[
        { href: '#demonstration', text: 'Demonstration' },
        { href: 'https://github.com/8k-eagle-eye/eagle-eye', text: 'GitHub' }
      ]}
    />

    <ViewerSection>
      <Container>
        <Heading id="demonstration" text="Demonstration" />
        <ViewerFrame>
          <Viewer aspect={16 / 9} />
          <div className="icon">
            <AnimationIcon text="Try zooming!" />
          </div>
        </ViewerFrame>
        <p>{dummyText}</p>
      </Container>
    </ViewerSection>

    <FeaturesSection>
      <Container>
        <h2 className="font-weight-bold mt-4 mt-md-0 mb-4">Features</h2>
        <FeatureList items={featureContents.items} />
      </Container>
    </FeaturesSection>

    <Footer
      className="pt-5"
      style={{
        backgroundColor: 'var(--color-primary-light)'
      }}
    />
  </div>
)

export default Home
