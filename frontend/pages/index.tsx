import React from 'react'
import { Container } from 'react-bootstrap'
import FeatureList, { FeatureListProps } from 'components/public/featureList'
import Footer from 'components/public/footer'
import Head, { HeadProps } from 'components/head'
import Header, { HeaderProps } from 'components/public/header'
import Heading, { HeadingProps } from 'components/public/heading'
import Hero, { HeroProps } from 'components/public/hero'
import Viewer, { ViewerProps } from 'components/viewer'
import aspectRatioIcon from 'assets/images/aspect-ratio.svg'
import phonelinkIcon from 'assets/images/phonelink.svg'
import { ResetStyle, BackgroundStyle } from 'assets/styles/globalStyle'
import { SITE_TITLE, APP_VERSION } from 'consts/meta'
import { styled } from 'assets/styles/theme'

interface Content {
  head: HeadProps
  header: HeaderProps
  hero: HeroProps
  viewer: {
    heading: HeadingProps
    main: ViewerProps
    description: string
  }
  features: {
    heading: string
    list: FeatureListProps
  }
}

const homeContent: Content = {
  head: {
    title: SITE_TITLE
  },
  header: {
    title: SITE_TITLE,
    version: APP_VERSION
  },
  hero: {
    heading: 'Application Concept, Copy etc...',
    description: `Eagle Eyeはユーザーが動画を通じて触れる世界を広げます。
8K相当の情報量を保持した動画を、ユーザーによる動画スワイプ、ズームイン/アウトをして視聴することが可能な動画プレーヤーです。`,
    linkList: [
      { href: '#demonstration', text: 'Demonstration' },
      { href: 'https://github.com/8k-eagle-eye/eagle-eye', text: 'GitHub' }
    ]
  },
  viewer: {
    heading: {
      id: 'demonstration',
      text: 'Demonstration'
    },
    main: {
      aspect: 16 / 9,
      baseUrl: process.env.STORAGE_ORIGIN as string
    },
    description: `「もっとよく見てみたい場所」に指を置いて、ズーム・スワイプ操作をしてみましょう。
直感的な操作で、細部に宿るた美しさ、精緻さが新しい動画体験を提供します。`
  },
  features: {
    heading: 'Features',
    list: {
      items: [
        {
          heading: 'インタラクティブな解像度補正',
          description:
            '8Kで撮影されたオリジナル動画のデータ密度を利用して最大12倍の無劣化ズームを実現します',
          icon: { src: aspectRatioIcon }
        },
        {
          heading: 'PCとスマホ両方のWebサイトに対応',
          description: `特別な環境・機材を必要とせず、現状のサイトに埋め込み・配信をします
          5Gともにやってくる8K動画の感動を4G環境でも少しだけ先取り体験出来ます`,
          icon: { src: phonelinkIcon }
        }
      ]
    }
  }
}

const ViewerSection = styled.section`
  margin-bottom: 30vw;

  @media screen and (min-width: 576px) {
    margin-bottom: 173px;
  }
`

const ViewerFrame = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  margin: 0 auto 2em;
  background-color: ${({ theme }) => theme.color.primaryDark};
  max-width: 640px;
`

const FeaturesSection = styled.section`
  position: relative;
  overflow-x: hidden;
  padding-top: 6vw;
  background-color: ${({ theme }) => theme.color.primaryLight};
  background-clip: content-box;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 1px;
    z-index: -1;
    display: block;
    height: 0;
    width: 0;
    border-style: solid;
  }

  &::before {
    right: 0;
    border-color: transparent transparent ${({ theme }) => theme.color.primaryDark} transparent;
    border-width: 0 0 6vw 100vw;
  }

  &::after {
    left: 0;
    border-color: transparent transparent transparent ${({ theme }) => theme.color.primaryLight};
    border-width: 6vw 0 0 100vw;
  }
`

const Home = () => (
  <>
    <Head {...homeContent.head} />
    <ResetStyle />
    <BackgroundStyle />

    <Header {...homeContent.header} />

    <Hero {...homeContent.hero} />

    <ViewerSection>
      <Container>
        <Heading className="text-center" {...homeContent.viewer.heading} />
        <ViewerFrame>
          <Viewer {...homeContent.viewer.main} />
        </ViewerFrame>
        <p className="text-md-center" style={{ whiteSpace: 'pre-line' }}>
          {homeContent.viewer.description}
        </p>
      </Container>
    </ViewerSection>

    <FeaturesSection>
      <Container>
        <h2 className="font-weight-bold mt-4 mt-md-0 mb-4">{homeContent.features.heading}</h2>
        <FeatureList {...homeContent.features.list} />
      </Container>
    </FeaturesSection>

    <Footer
      className="pt-5"
      style={{
        backgroundColor: 'var(--color-primary-light)'
      }}
    />
  </>
)

export default Home
