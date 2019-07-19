import Link from 'next/link'
import React, { FC, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import { COPYRIGHT } from 'consts/meta'

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

const ListItem = ({ text, icon }: Omit<FooterListItem, 'href'>) => (
  <>
    {icon ? (
      <>
        {text}
        <img {...icon} />
      </>
    ) : (
      text
    )}
  </>
)

const LinkList = (props: Required<Pick<FooterProps, 'listItems'>>) => (
  <>
    {props.listItems.map(({ text, href, icon }) => (
      <li key={text}>
        {href ? (
          <Link href={href}>
            <a>
              <ListItem {...{ text, icon }} />
            </a>
          </Link>
        ) : (
          <ListItem {...{ text, icon }} />
        )}
      </li>
    ))}
  </>
)

const Footer: FC<FooterProps> & { defaultProps: Partial<FooterProps> } = props => (
  <StyledFooter {...props}>
    <Container>
      <ul>
        <li>
          <small>{props.copyright}</small>
        </li>
        {props.listItems && props.listItems.length > 0 && <LinkList listItems={props.listItems} />}
      </ul>
    </Container>
  </StyledFooter>
)

Footer.defaultProps = {
  copyright: COPYRIGHT,
  listItems: [
    {
      text: 'GitHub',
      href: 'https://github.com/8k-eagle-eye/eagle-eye',
      icon: {
        src: '/static/images/github.svg',
        alt: 'GitHub icon'
      }
    }
  ]
}

export default Footer
