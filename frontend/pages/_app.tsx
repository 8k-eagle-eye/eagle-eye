import App, { Container, AppContext } from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from 'assets/styles/theme'

export default class MyApp extends App {
  public static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  public render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    )
  }
}
