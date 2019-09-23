import React, { FC, HTMLAttributes } from 'react'
import { Container } from 'react-bootstrap'
import { COPYRIGHT, TWITTER_URL } from 'consts/meta'
import { styled } from 'assets/styles/theme'
import imageTwitter from 'assets/images/home/twitter.svg'

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  copyright: string
  twitterUrl: string
}

const StyledFooter = styled.footer`
  padding-top: 2rem;
  padding-bottom: 2rem;
  text-align: center;
`

const TwitterLink = styled.a`
  display: inline-block;
  margin-bottom: 30px;
`

const Footer: FC<FooterProps> & { defaultProps: Partial<FooterProps> } = props => (
  <StyledFooter>
    <TwitterLink href={props.twitterUrl} target="_brank">
      <img src={imageTwitter} />
    </TwitterLink>
    <Container as="p" className="text-center">
      <small>{props.copyright}</small>
    </Container>
  </StyledFooter>
)

Footer.defaultProps = {
  copyright: COPYRIGHT,
  twitterUrl: TWITTER_URL
}

export default Footer
