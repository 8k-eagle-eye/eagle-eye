import React from 'react'
import { withRouter } from 'next/router'
import { Container } from 'react-bootstrap'
import FeatureList, { FeatureListProps } from 'components/public/featureList'
import Footer from 'components/public/footer'
import Head, { HeadProps } from 'components/head'
import Header, { HeaderProps } from 'components/public/header'
import FirstView, { FirstViewProps } from 'components/public/firstView'
import Hero, { HeroProps } from 'components/public/hero'
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
  firstView: FirstViewProps
  features: {
    heading: string
    list: FeatureListProps
  }
}

const homeContent: { [key: string]: Content } = {
  jp: {
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
    firstView: {
      heading: {
        titles: ['最大12倍ズームの', '新しい映像体験'],
        subs: [
          'Eagle Eyeは8K動画データをタイル分割することで',
          'マップのようなズーム操作を実現した動画プレーヤーです'
        ]
      },
      main: {
        aspect: 16 / 9,
        duration: 34,
        baseUrl: `${process.env.BASE_URL_JP as string}/tokyo`
      }
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
  },
  us: {
    head: {
      title: SITE_TITLE
    },
    header: {
      title: SITE_TITLE,
      version: APP_VERSION
    },
    hero: {
      heading: 'Clear video streaming in 12x zoom.',
      src: x12Img,
      description:
        'With zoom and resolution correction, even the name of small building is readable.'
    },
    hero2: {
      heading: 'Clear in any detail parts in video, by 8K.',
      src: compereImg,
      description: '16x more data volume comparing with regular video.'
    },
    firstView: {
      heading: {
        titles: ['New video streaming experience', 'with maximum 12x zoom in.'],
        subs: [
          'Eagle Eye is video streaming player which provides zooming UX like map',
          'with image segmentation method for 8K video.'
        ]
      },
      main: {
        aspect: 16 / 9,
        duration: 34,
        baseUrl: `${process.env.BASE_URL_US as string}/tokyo`
      }
    },
    features: {
      heading: 'Features',
      list: {
        items: [
          {
            heading: 'Interactive resolution correction.',
            icon: { src: aspectRatioIcon }
          },
          {
            heading: 'Support both smartphone and PC web site.',
            icon: { src: phonelinkIcon }
          },
          {
            heading: 'One 8K video is enough to convert to suitable data format for any users.',
            icon: { src: phonelinkIcon }
          }
        ]
      }
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

const Home = withRouter(props => {
  const { lang } = props.router.query
  const content = homeContent[typeof lang === 'string' ? lang : 'jp'] || homeContent.us

  return (
    <>
      <Head {...content.head} />
      <ResetStyle />
      <BackgroundStyle />

      <Header {...content.header} />

      <FirstView {...content.firstView} />

      <Hero {...content.hero} />

      <Hero {...content.hero2} />

      <FeaturesSection>
        <Container>
          <h2 className="font-weight-bold mt-4 mt-md-0 mb-4">{content.features.heading}</h2>
          <FeatureList {...content.features.list} />
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
})

export default Home
