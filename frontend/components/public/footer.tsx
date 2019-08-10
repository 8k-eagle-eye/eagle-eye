import React, { FC, HTMLAttributes } from 'react'
import { Container } from 'react-bootstrap'
import { COPYRIGHT } from 'consts/meta'
import { styled } from 'assets/styles/theme'

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  copyright: string
}

const StyledFooter = styled.footer`
  padding-top: 2rem;
  padding-bottom: 2rem;
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
