import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import Heading from 'components/public/heading'

export interface HeroProps {
  heading: string
  description?: string
  linkList?: {
    href: string
    text: string
  }[]
}

const HeroSection = styled.section`
  position: relative;
  margin-bottom: 30vw;
  padding-top: 30vw;

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
  .link {
    display: block;
    padding: 0.5em 1em;
    border: solid 2px ${({ theme }) => theme.color.primary};
    border-radius: 4px;
    color: ${({ theme }) => theme.color.primary};
    font-weight: bold;

    &:hover {
      text-decoration: none;
    }
  }

  li {
    display: inline-block;
  }

  li:first-child {
    .link {
      background-color: ${({ theme }) => theme.color.primary};
      color: var(--white);
    }
  }

  li:nth-child(n + 2) {
    margin-left: 1.5em;
  }
`

const LinkList = (props: Required<Pick<HeroProps, 'linkList'>>) => (
  <HeroLinkList>
    {props.linkList.map(link => (
      <li key={link.href}>
        <Link href={link.href}>
          <a className="link">{link.text}</a>
        </Link>
      </li>
    ))}
  </HeroLinkList>
)

const Hero = (props: HeroProps) => (
  <HeroSection>
    <Container className="text-md-center">
      <Heading text={props.heading} />
      {props.description && <HeroDescription>{props.description}</HeroDescription>}
      {props.linkList && props.linkList.length > 0 && <LinkList linkList={props.linkList} />}
    </Container>
  </HeroSection>
)

export default Hero
