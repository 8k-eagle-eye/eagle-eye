import React from 'react'
import { Container } from 'react-bootstrap'
import FeatureList, { FeatureListProps } from 'components/public/featureList'
import Footer from 'components/public/footer'
import Head, { HeadProps } from 'components/head'
import Header, { HeaderProps } from 'components/public/header'
import { HeadingProps } from 'components/public/heading'
import FirstView from 'components/public/firstView'
import Hero, { HeroProps } from 'components/public/hero'
import { ViewerProps } from 'components/viewer'
import aspectRatioIcon from 'assets/images/aspect-ratio.svg'
import phonelinkIcon from 'assets/images/phonelink.svg'
import { ResetStyle, BackgroundStyle } from 'assets/styles/globalStyle'
import { SITE_TITLE, APP_VERSION } from 'consts/meta'
import { styled } from 'assets/styles/theme'
import x12Img from 'assets/images/x12.jpg'
import compereImg from 'assets/images/compare.jpg'

interface Content {
  head: HeadProps
  header: HeaderProps
  hero: HeroProps
  hero2: HeroProps
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
    heading: '12倍にズームしてもクッキリ再生',
    src: x12Img,
    description: 'ズーム+解像度補正で小さな建物の名前まで読み取れる'
  },
  hero2: {
    heading: '8K動画を使うから細部までキレイ',
    src: compereImg,
    description: '通常の動画と比較して16倍以上の情報量'
  },
  viewer: {
    heading: {
      id: 'demonstration',
      text: 'Demonstration'
    },
    main: {
      aspect: 16 / 9,
      duration: 34,
      baseUrl: `${process.env.BASE_URL_JP as string}/tokyo`
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
          icon: { src: aspectRatioIcon }
        },
        {
          heading: 'PCとスマホ両方のWebサイトに対応',
          icon: { src: phonelinkIcon }
        },
        {
          heading: '8K動画一つあれば変換可能',
          icon: { src: phonelinkIcon }
        }
      ]
    }
  }
}

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

    <FirstView {...homeContent.viewer.main} />

    <Hero {...homeContent.hero} />

    <Hero {...homeContent.hero2} />

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
