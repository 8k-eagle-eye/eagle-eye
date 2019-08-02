// ref: https://github.com/zeit/next.js/blob/canary/examples/with-mobx/components/Page.js
import React from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import Clock from 'components/exampleMobx/Clock'
import { Store } from 'stores/index'

@inject('store')
@observer
class Page extends React.Component<{ title: string; linkTo: string; store?: Store }> {
  public componentDidMount() {
    this.props.store!.start()
  }

  public componentWillUnmount() {
    this.props.store!.stop()
  }

  public render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <Clock lastUpdate={this.props.store!.lastUpdate} light={this.props.store!.light} />
        <nav>
          <Link href={this.props.linkTo}>
            <a>Navigate</a>
          </Link>
        </nav>
      </div>
    )
  }
}

export default Page
