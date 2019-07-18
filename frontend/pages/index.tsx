import React from 'react'
import styled from 'styled-components'
import Head from 'components/head'
import Viewer from 'components/viewer'
import { ResetStyle } from 'assets/styles/globalStyle'

const ViewerFrame = styled.div`
  width: 600px;
  margin: 30px auto;
`

const Home = () => (
  <div>
    <Head title="Home" />
    <ResetStyle />

    <ViewerFrame>
      <Viewer aspect={16 / 9} />
    </ViewerFrame>
  </div>
)

export default Home
