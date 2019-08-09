import React from 'react'
import Footer from 'components/public/footer'
import Head, { HeadProps } from 'components/head'
import Header from 'components/public/header'
import Hero, { HeroProps } from 'components/public/hero'
import Feature, { FeatureProps } from 'components/public/feature'
import Viewer, { ViewerProps } from 'components/viewer'
import { ResetStyle } from 'assets/styles/globalStyle'
import { SITE_TITLE } from 'consts/meta'
import { styled } from 'assets/styles/theme'
import x12Img from 'assets/images/home-x12.jpg'
import compereImg from 'assets/images/home-compare.jpg'

interface Content {
  head: HeadProps
  hero: HeroProps
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

export default Home
