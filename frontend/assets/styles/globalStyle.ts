import { createGlobalStyle, css } from 'styled-components'
import { theme } from 'assets/styles/theme'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getKeys<K extends keyof V, V extends { [key: string]: any }>(value: V): K[] {
  return Object.keys(value) as K[]
}

const toPascalCase = (str: string) =>
  str
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase()

const cssCustomProperties: string = getKeys(theme).reduce((styles, property) => {
  getKeys(theme[property]).forEach(key => {
    styles += `--${toPascalCase(`${property}-${key}`)}: ${theme[property][key]};`
  })
  return styles
}, '')

export const ResetStyle = createGlobalStyle`
  :root{
    ${css`
      ${cssCustomProperties}
    `}
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
      Helvetica, sans-serif;
  }

  a {
    color: inherit;

    &:hover {
      color: inherit;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul {
    margin-top: 0;
    margin-bottom: 0;
  }

  img {
    max-width: 100%;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
  }

  small {
    font-size: inherit;
  }
`
