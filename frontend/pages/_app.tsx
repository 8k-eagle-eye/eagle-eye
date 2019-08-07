import App, { Container, AppContext } from 'next/app'
import React from 'react'
import { Provider } from 'mobx-react'
import { ThemeProvider } from 'styled-components'
import { fetchInitialStoreState, StoreData, Store } from 'stores/index'
import { theme } from 'assets/styles/theme'

export default class MyApp extends App {
  public state = {
    store: new Store()
  }

  // Fetching serialized(JSON) store state
  public static async getInitialProps(appContext: AppContext) {
    const appProps = await App.getInitialProps(appContext)
    const initialStoreState = await fetchInitialStoreState()

    return {
      ...appProps,
      initialStoreState
    }
  }

  // Hydrate serialized state to store
  public static getDerivedStateFromProps(
    props: { initialStoreState: StoreData },
    state: { store: Store }
  ) {
    state.store.hydrate(props.initialStoreState)
    return state
  }

  public render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Provider store={this.state.store}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </Container>
    )
  }
}
