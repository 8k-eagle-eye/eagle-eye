import baseStyled, { ThemedStyledInterface } from 'styled-components'

export const theme = {
  color: {
    primary: '#fedd00',
    primaryDark: '#fff298',
    primaryLight: '#fffadc',
    gray: '#6c757d'
  },
  fontSize: {
    xl: '64px',
    l: '32px'
  }
}

export type Theme = typeof theme

export const styled = baseStyled as ThemedStyledInterface<Theme>

export default theme
