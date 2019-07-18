import React from 'react'
import styled from 'styled-components'
import Head from 'components/head'
import Header from 'components/public/header'
import Viewer from 'components/viewer'
import { ResetStyle } from 'assets/styles/globalStyle'
import { SITE_TITLE, APP_VERSION } from 'consts/meta'

const ViewerFrame = styled.div`
  width: 600px;
  margin: 30px auto;
`

const Home = () => (
  <div>
    <Head title={SITE_TITLE} />
    <ResetStyle />
    <Header title={SITE_TITLE} version={APP_VERSION} />

    <ViewerFrame>
      <Viewer aspect={16 / 9} />
    </ViewerFrame>
  </div>
)

export default Home
