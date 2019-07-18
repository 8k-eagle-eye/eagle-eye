import React from 'react'
import styled from 'styled-components'
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

const ViewerFrame = styled.div`
  width: 600px;
  margin: 30px auto;
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

    <ViewerFrame>
      <Viewer aspect={16 / 9} />
    </ViewerFrame>
  </div>
)

export default Home
