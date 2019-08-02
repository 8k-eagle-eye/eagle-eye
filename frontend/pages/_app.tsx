import App, { Container, AppContext } from 'next/app'
import React from 'react'
import { Provider } from 'mobx-react'
import { ThemeProvider } from 'styled-components'
import { initializeStore, Store } from 'stores/index'
import { theme } from 'assets/styles/theme'

export default class MyApp extends App {
  public static async getInitialProps({ Component, ctx }: AppContext) {
    const mobxStore = initializeStore()
    // ctx.mobxStore = mobxStore
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps, initialMobxState: mobxStore }
  }

  private store: Store = null as any

  public constructor(props: any) {
    super(props)
    const isServer = typeof window === 'undefined'
    this.store = isServer ? props.initialMobxState : initializeStore(props.initialMobxState)
  }

  public render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Provider store={this.store}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </Container>
    )
  }
}
