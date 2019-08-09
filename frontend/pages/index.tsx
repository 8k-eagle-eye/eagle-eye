import React from 'react'
import { withRouter } from 'next/router'
import Footer from 'components/public/footer'
import Head, { HeadProps } from 'components/head'
import Header from 'components/public/header'
import Hero, { HeroProps } from 'components/public/hero'
import Feature, { FeatureProps } from 'components/public/feature'
import Viewer, { ViewerProps } from 'components/viewer'
import Wrapper from 'components/public/wrapper'
import { ResetStyle } from 'assets/styles/globalStyle'
import { SITE_TITLE } from 'consts/meta'
import imageX12 from 'assets/images/home/x12.jpg'
import imageCompere from 'assets/images/home/compare.jpg'

interface Content {
  head: HeadProps
  hero: HeroProps
  viewer: ViewerProps
  features: FeatureProps[]
}

const homeContent: { [key: string]: Content } = {
  jp: {
    head: {
      title: SITE_TITLE
    },
    hero: {
      heading: `最大12倍ズームの
      新しい映像体験`,
      description: `Eagle Eyeは8K動画データをタイル分割することで
        マップのようなズーム操作を実現した動画プレーヤーです`
    },
    viewer: {
      aspect: 16 / 9,
      duration: 34,
      baseUrl: `${process.env.BASE_URL_JP}/tokyo`
    },
    features: [
      {
        heading: '12倍にズームしてもクッキリ再生',
        image: { src: imageX12 },
        caption: 'ズーム+解像度補正で小さな建物の名前まで読み取れる'
      },
      {
        heading: '8K動画を使うから細部までキレイ',
        image: { src: imageCompere },
        caption: '通常の動画と比較して16倍以上の情報量'
      }
    ]
  },
  us: {
    head: {
      title: SITE_TITLE
    },
    hero: {
      heading: `New video streaming experience
      with maximum 12x zoom in.`,
      description: `Eagle Eye is video streaming player which provides zooming UX like map
      with image segmentation method for 8K video.`
    },
    viewer: {
      aspect: 16 / 9,
      duration: 34,
      baseUrl: `${process.env.BASE_URL_US}/tokyo`
    },
    features: [
      {
        heading: 'Clear video streaming in 12x zoom.',
        image: { src: imageX12 },
        caption: 'With zoom and resolution correction, even the name of small building is readable.'
      },
      {
        heading: 'Clear in any detail parts in video, by 8K.',
        image: { src: imageCompere },
        caption: '16x more data volume comparing with regular video.'
      }
    ]
  }
}

const Home = withRouter(props => {
  const { lang } = props.router.query
  const content = homeContent[typeof lang === 'string' ? lang : 'jp'] || homeContent.us

  return (
    <>
      <Head {...content.head} />
      <ResetStyle />
      <Header />
      <Hero {...content.hero} style={{ paddingBottom: '20vh' }} />

      <Wrapper style={{ marginTop: '-20vh', boxShadow: '-5px 10px 30px 0px rgba(0, 0, 0, 0.4)' }}>
        <Viewer {...content.viewer} />
      </Wrapper>

      {content.features.map((feature, index) => (
        <Wrapper as="section" className="text-center" key={index}>
          <Feature {...feature} />
        </Wrapper>
      ))}

      <Footer />
    </>
  )
})

export default Home
