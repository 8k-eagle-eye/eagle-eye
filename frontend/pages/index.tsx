import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { withRouter } from 'next/router'
import Footer from 'components/public/footer'
import Head, { HeadProps } from 'components/head'
import Header from 'components/public/header'
import Hero, { HeroProps } from 'components/public/hero'
import Strength, { StrengthProps } from 'components/public/strength'
import FixedScroll, { FixedScrollProps } from 'components/public/fixedScroll'
import Feature1 from 'components/public/feature1'
import Feature2 from 'components/public/feature2'
import Wrapper from 'components/public/wrapper'
import iconAspectRatio from 'assets/images/home/aspect-ratio.svg'
import iconMovieFilter from 'assets/images/home/movie-filter.svg'
import iconPhonelink from 'assets/images/home/phonelink.svg'
import { ResetStyle } from 'assets/styles/globalStyle'
import { styled } from 'assets/styles/theme'

interface Content {
  head: HeadProps
  hero: HeroProps
  features: FixedScrollProps[]
  strengths: StrengthProps[]
}

const homeContent: { [key: string]: Content } = {
  jp: {
    head: {
      title: '最大12倍ズームの新しい映像体験',
      description:
        'Eagle Eyeは8K動画データをタイル分割することでマップのようなズーム操作を実現した動画プレーヤーです'
    },
    hero: {
      heading: `最大12倍ズームの
      新しい映像体験`,
      description: `Eagle Eyeは8K動画データをタイル分割することで
        マップのようなズーム操作を実現した動画プレーヤーです`,
      viewer: {
        aspect: 16 / 9,
        duration: 34,
        baseUrl: `${process.env.BASE_URL_JP}/tokyo`
      }
    },
    features: [
      {
        heading: '12倍にズームしてもクッキリ再生',
        vhTimes: 2,
        caption: 'ズーム+解像度補正で小さな建物の名前まで読み取れる'
      },
      {
        heading: '8K動画を使うから細部までキレイ',
        vhTimes: 2,
        caption: '通常の動画と比較して16倍以上の情報量'
      }
    ],
    strengths: [
      {
        heading: 'インタラクティブな解像度補正',
        image: { src: iconAspectRatio }
      },
      {
        heading: 'PCとスマホ両方のWebサイトに対応',
        image: { src: iconPhonelink }
      },
      {
        heading: '8K動画一つあれば変換可能',
        image: { src: iconMovieFilter }
      }
    ]
  },
  us: {
    head: {
      title: 'New video streaming experience with maximum 12x zoom in.',
      description:
        'Eagle Eye is video streaming player which provides zooming UX like map with image segmentation method for 8K video.'
    },
    hero: {
      heading: `New experience
      with 12x zoom in.`,
      description: `Eagle Eye is video streaming player which provides zooming UX like map
      with image segmentation method for 8K video.`,
      viewer: {
        aspect: 16 / 9,
        duration: 34,
        baseUrl: `${process.env.BASE_URL_JP}/tokyo` // todo: location swiching
      }
    },
    features: [
      {
        heading: 'Clear video streaming in 12x zoom.',
        vhTimes: 2,
        caption: 'With zoom and resolution correction, even the name of small building is readable.'
      },
      {
        heading: 'Clear in any detail parts in video, by 8K.',
        vhTimes: 2,
        caption: '16x more data volume comparing with regular video.'
      }
    ],
    strengths: [
      {
        heading: 'Interactive resolution correction.',
        image: { src: iconAspectRatio }
      },
      {
        heading: 'Support both smartphone and PC web site.',
        image: { src: iconPhonelink }
      },
      {
        heading: 'One 8K video is enough to convert to suitable data format for any users.',
        image: { src: iconMovieFilter }
      }
    ]
  }
}

const ModifiedWrapper = styled(Wrapper)`
  width: 100%;
  max-width: initial;
  background-color: #f8f9fa;
  padding-top: 3rem;
  padding-bottom: 2rem;
`

const Home = withRouter(props => {
  const { lang } = props.router.query
  const content = homeContent[typeof lang === 'string' ? lang : 'us'] || homeContent.us

  return (
    <>
      <Head {...content.head} />
      <ResetStyle />
      <Header />
      <Hero {...content.hero} />

      <FixedScroll {...content.features[0]}>
        <Feature1 scrollRatio={0} />
      </FixedScroll>

      <FixedScroll {...content.features[1]}>
        <Feature2 scrollRatio={0} />
      </FixedScroll>

      <ModifiedWrapper>
        <Container>
          <Row>
            {content.strengths.map((strength, index) => (
              <Col key={index} md className="mt-4 mt-md-0">
                <Strength {...strength} />
              </Col>
            ))}
          </Row>
        </Container>
      </ModifiedWrapper>

      <Footer style={{ backgroundColor: '#f8f9fa' }} />
    </>
  )
})

export default Home
