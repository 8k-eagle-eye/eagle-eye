import React, { FC, HTMLAttributes } from 'react'
import { Container } from 'react-bootstrap'
import { COPYRIGHT } from 'consts/meta'
import { styled } from 'assets/styles/theme'

export interface FooterListItem {
  text: string
  href?: string
  icon?: {
    src: string
    alt?: string
  }
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  copyright: string
  listItems?: FooterListItem[]
}

const StyledFooter = styled.footer`
  padding-bottom: 2rem;

  ul {
    display: flex;
    justify-content: center;
  }

  li:nth-child(n + 2) {
    margin-left: 1rem;
  }

  a {
    font-weight: bold;
  }

  img {
    width: 1.5em;
    margin-top: -0.2em;
    margin-left: 0.4em;
  }
`

const Footer: FC<FooterProps> & { defaultProps: Partial<FooterProps> } = props => (
  <StyledFooter {...props}>
    <Container>
      <ul>
        <li>
          <small>{props.copyright}</small>
        </li>
      </ul>
    </Container>
  </StyledFooter>
)

Footer.defaultProps = {
  copyright: COPYRIGHT
}

export default Footer
