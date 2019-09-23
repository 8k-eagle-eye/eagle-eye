import Link from 'next/link'
import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import imageLogo8kee from 'assets/images/logo-8kee.png'
import { SITE_TITLE } from 'consts/meta'
import { styled } from 'assets/styles/theme'

export interface HeaderProps {
  heading: string
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  logo?: string
}

const StyledHeader = styled.header`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  width: 100%;

  & + * {
    padding-top: 82px;
  }

  @media screen and (min-width: 768px) {
    & + * {
      padding-top: 110px;
    }
  }

  @media screen and (min-width: 1200px) {
    & + * {
      padding-top: 146px;
    }
  }
`

const Heading = styled.h1`
  padding: 0.5em 0 0.25em;
  font-size: 2rem;
`

const Languages = styled.div`
  position: absolute;
  top: 15px;
  right: 25px;
  color: #fff;
`

const Logo = styled.img`
  width: 25%;
  max-width: 240px;
  min-width: 160px;
`

const Header: FC<HeaderProps> & { defaultProps: Partial<HeaderProps> } = props => (
  <StyledHeader>
    <Container>
      <Heading as={props.headingLevel}>
        <Link href="/">
          <a>{props.logo ? <Logo src={props.logo} alt={props.heading} /> : props.heading}</a>
        </Link>
      </Heading>
      <Languages>
        <Link href="/?lang=us">
          <a>English</a>
        </Link>{' '}
        /{' '}
        <Link href="/?lang=jp">
          <a>Japanese</a>
        </Link>
      </Languages>
    </Container>
  </StyledHeader>
)

Header.defaultProps = {
  heading: SITE_TITLE,
  logo: imageLogo8kee
}

export default Header
