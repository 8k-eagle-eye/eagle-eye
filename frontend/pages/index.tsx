import React from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import Head from 'components/head'
import Header from 'components/public/header'
import Hero from 'components/public/hero'
import Viewer from 'components/viewer'
import { ResetStyle } from 'assets/styles/globalStyle'
import { SITE_TITLE, APP_VERSION } from 'consts/meta'

const dummyText = `
Lorem ipsum dolor, sit amet consectetur adipisicing elit.
Nostrum harum laudantium dicta laboriosam iste molestias totam
aperiam, iusto consectetur obcaecati, facilis velit, voluptatum
nisi sed. Vero molestias minus sequi voluptatem!
`

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
  </div>
)

export default Home
