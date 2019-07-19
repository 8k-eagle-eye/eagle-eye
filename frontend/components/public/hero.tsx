import React from 'react'
import styled from 'styled-components'
import { Button, Container } from 'react-bootstrap'
import Heading from 'components/public/heading'

export interface HeroProps {
  heading: string
  description?: string
  linkButtons?: {
    href: string
    text: string
  }[]
}

const HeroSection = styled.section`
  position: relative;
  margin-bottom: 30vw;
  padding-top: 30vw;
  text-align: center;

  @media screen and (min-width: 576px) {
    margin-bottom: 173px;
    padding-top: 173px;
  }
`

const HeroDescription = styled.p`
  margin-bottom: 1.2rem;
  color: ${({ theme }) => theme.color.gray};
  white-space: pre-line;
`

const HeroLinkList = styled.ul`
  display: flex;
  justify-content: center;

  & li:nth-child(n + 2) {
    margin-left: 1.5em;
  }
`

const LinkList = (props: Required<Pick<HeroProps, 'linkButtons'>>) => (
  <HeroLinkList>
    {props.linkButtons.map(linkButton => (
      <li key={linkButton.href}>
        <a href={linkButton.href}>
          <Button variant="outline-warning">{linkButton.text}</Button>
        </a>
      </li>
    ))}
  </HeroLinkList>
)

const Hero = (props: HeroProps) => (
  <HeroSection>
    <Container>
      <Heading text={props.heading} />
      {props.description && <HeroDescription>{props.description}</HeroDescription>}
      {props.linkButtons && props.linkButtons.length > 0 && (
        <LinkList linkButtons={props.linkButtons} />
      )}
    </Container>
  </HeroSection>
)

export default Hero
