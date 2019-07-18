interface CssDeclaration {
  [key: string]: string
}

interface Theme {
  [key: string]: CssDeclaration
}

export const color: CssDeclaration = {
  primary: '#fedd00',
  primaryDark: '#fff298',
  primaryLight: '#fffadc',
  gray: '#6c757d'
}

export const fontSize: CssDeclaration = {
  xl: '64px',
  l: '32px'
}

const theme: Theme = {
  color,
  fontSize
}

export default theme
