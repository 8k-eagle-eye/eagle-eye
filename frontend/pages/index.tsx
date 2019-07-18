import React from 'react'
import styled from 'styled-components'
import Head from 'components/head'
import Viewer from 'components/viewer'

const ViewerFrame = styled.div`
  width: 600px;
  margin: 30px auto;
`

const Home = () => (
  <div>
    <Head title="Home" />

    <ViewerFrame>
      <Viewer aspect={16 / 9} />
    </ViewerFrame>
  </div>
)

export default Home
