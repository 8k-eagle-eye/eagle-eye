import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import { COPYRIGHT } from 'consts/meta'
import { styled } from 'assets/styles/theme'

export interface FooterProps {
  copyright: string
}

const StyledFooter = styled.footer`
  margin-top: 30vw;
  padding-top: 2rem;
  padding-bottom: 2rem;

  @media screen and (min-width: 576px) {
    margin-top: 173px;
  }
`

const Footer: FC<FooterProps> & { defaultProps: Partial<FooterProps> } = props => (
  <StyledFooter {...props}>
    <Container as="p" className="text-center">
      <small>{props.copyright}</small>
    </Container>
  </StyledFooter>
)

Footer.defaultProps = {
  copyright: COPYRIGHT
}

export default Footer
