import NextHead from 'next/head'
import React, { FC } from 'react'
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from 'consts/meta'

export interface HeadProps {
  title: string
  description: string
  url?: string
}

const Head: FC<HeadProps> & { defaultProps: Partial<HeadProps> } = props => {
  const title = props.title ? `${props.title} | ${SITE_TITLE}` : SITE_TITLE
  const ogImage = '/static/og-image.png'
  const touchIcon = '/static/touch-icon.png'
  const maskIcon = '/static/favicon-mask.svg'
  const favicon = '/static/favicon.ico'

  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{title}</title>
      <meta name="description" content={props.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:url" content={props.url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={props.description} />
      <meta name="twitter:site" content={props.url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <link rel="icon" sizes="192x192" href={touchIcon} />
      <link rel="apple-touch-icon" href={touchIcon} />
      <link rel="mask-icon" href={maskIcon} />
      <link rel="icon" href={favicon} />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      />
    </NextHead>
  )
}

Head.defaultProps = {
  title: '',
  description: SITE_DESCRIPTION,
  url: SITE_URL
}

export default Head
