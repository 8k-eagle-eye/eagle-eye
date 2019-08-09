import React from 'react'
<<<<<<< HEAD
import Footer from 'components/public/footer'
import Head, { HeadProps } from 'components/head'
import Header from 'components/public/header'
import Hero, { HeroProps } from 'components/public/hero'
import Feature, { FeatureProps } from 'components/public/feature'
import Viewer, { ViewerProps } from 'components/viewer'
import { ResetStyle } from 'assets/styles/globalStyle'
import { SITE_TITLE } from 'consts/meta'
=======
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
>>>>>>> origin/sample/design
import { styled } from 'assets/styles/theme'
import x12Img from 'assets/images/home-x12.jpg'
import compereImg from 'assets/images/home-compare.jpg'

interface Content {
  head: HeadProps
  hero: HeroProps
<<<<<<< HEAD
  features: FeatureProps[]
  viewer: ViewerProps
}

const homeContent: Content = {
  head: {
    title: SITE_TITLE
  },
  hero: {
    heading: `最大12倍ズームの
    新しい映像体験`,
    description: `Eagle Eyeは8K動画データをタイル分割することで
      マップのようなズーム操作を実現した動画プレーヤーです`
  },
  features: [
    {
      heading: '12倍にズームしてもクッキリ再生',
      image: { src: x12Img },
      caption: 'ズーム+解像度補正で小さな建物の名前まで読み取れる'
    },
    {
      heading: '8K動画を使うから細部までキレイ',
      image: { src: compereImg },
      caption: '通常の動画と比較して16倍以上の情報量'
=======
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
>>>>>>> origin/sample/design
    }
  ],
  viewer: {
    aspect: 16 / 9,
    duration: 34,
    baseUrl: process.env.STORAGE_ORIGIN as string
  }
}

const Wrapper = styled.div`
  width: 80%;
  max-width: 960px;
  margin-right: auto;
  margin-left: auto;

  & + & {
    margin-top: 30vw;
  }

  @media screen and (min-width: 576px) {
    & + & {
      margin-top: 173px;
    }
  }
`

<<<<<<< HEAD
const Home = () => (
  <>
    <Head {...homeContent.head} />
    <ResetStyle />
    <Header />
    <Hero {...homeContent.hero} style={{ paddingBottom: '15vh' }} />

    <Wrapper style={{ marginTop: '-15vh', boxShadow: '-5px 10px 30px 0px rgba(0, 0, 0, 0.4)' }}>
      <Viewer {...homeContent.viewer} />
    </Wrapper>

    <Wrapper as="section" className="text-center">
      <Feature {...homeContent.features[0]} />
    </Wrapper>

    <Wrapper as="section" className="text-center">
      <Feature {...homeContent.features[1]} />
    </Wrapper>

    <Footer />
  </>
)
=======
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
>>>>>>> origin/sample/design

export default Home
