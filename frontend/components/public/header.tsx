import Link from 'next/link'
import React from 'react'
import { Container } from 'react-bootstrap'
import { styled } from 'assets/styles/theme'
import logoImg from 'assets/images/logo.png'

export interface HeaderProps {
  title: string
  version: string
}

const HeaderElement = styled.header`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  width: 100%;
`

const Title = styled.h1`
  padding: 0.25em 0;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: bold;

  a:hover {
    text-decoration: none;
  }
`

const Logo = styled.img`
  width: 240px;
  max-width: 25%;
`

const Version = styled.sup`
  color: ${({ theme }) => theme.color.primary};
  font-size: 0.5em;
  top: -0.8em;
`

const Header = (props: HeaderProps) => (
  <HeaderElement>
    <Container>
      <Title>
        <Link href="/">
          <a>
            <Logo src={logoImg} alt={props.title} />
            <Version>{props.version}</Version>
          </a>
        </Link>
      </Title>
    </Container>
  </HeaderElement>
)

export default Header
