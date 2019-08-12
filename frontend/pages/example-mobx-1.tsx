// ref: https://github.com/zeit/next.js/blob/canary/examples/with-mobx/pages/index.js
import React from 'react'
import Page from 'components/exampleMobx/Page'

export default class Counter extends React.Component {
  public render() {
    return <Page title="Index Page" linkTo="/example-mobx-2" />
  }
}
