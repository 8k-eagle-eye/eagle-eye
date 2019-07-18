import { createGlobalStyle, css } from 'styled-components'
import { color } from 'assets/styles/theme'

const toPascalCase = (str: string) =>
  str
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase()

const cssColorVars = Object.keys(color).reduce((styles, key): string => {
  return (styles += `--color-${toPascalCase(key)}: ${color[key]};`)
}, '')

export const ResetStyle = createGlobalStyle`
  :root{
    ${css`
      ${cssColorVars}
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
