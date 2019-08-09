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
`

const Heading = styled.h1`
  padding: 0.25em 0;
  font-size: 2rem;
`

const Logo = styled.img`
  width: 25%;
  max-width: 240px;
  min-width: 120px;
`

const Header: FC<HeaderProps> & { defaultProps: Partial<HeaderProps> } = props => (
  <StyledHeader>
    <Container>
      <Heading as={props.headingLevel}>
        <Link href="/">
          <a>{props.logo ? <Logo src={props.logo} alt={props.heading} /> : props.heading}</a>
        </Link>
      </Heading>
    </Container>
  </StyledHeader>
)

Header.defaultProps = {
  heading: SITE_TITLE,
  logo: imageLogo8kee
}

export default Header
