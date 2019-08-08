import React from 'react'
import styled from 'styled-components'
import Viewer, { ViewerProps } from 'components/viewer'
import bgImg from 'assets/images/top-bg.jpg'

const FirstViewRoot = styled.div`
  min-height: 100vh;
  position: relative;
`

const BackgroundImg = styled.div`
  height: 100vh;
  background: center/cover url(${bgImg});
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #012b;
  }
`

const Container = styled.div`
  position: relative;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeadingText = styled.h2`
  text-align: center;
  color: #fff;
  font-size: 64px;
  padding-top: 40px;
`

const Subtitle = styled.div`
  text-align: center;
  padding-top: 40px;
  color: rgb(255, 226, 53);
  font-size: 20px;
`

const ViewerFrame = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  margin: 0 auto;
  max-width: 960px;
  width: 80%;
  box-shadow: 0 10px 30px 0px rgba(0, 0, 0, 0.4);
`

const FirstView = (props: ViewerProps) => {
  return (
    <FirstViewRoot>
      <BackgroundImg />

      <Container>
        <div>
          <HeadingText>
            最大12倍ズームの
            <br />
            新しい映像体験
          </HeadingText>

          <Subtitle>
            Eagle Eyeは8K動画データをタイル分割することで
            <br />
            マップのようなズーム操作を実現した動画プレーヤーです
          </Subtitle>
        </div>
      </Container>

      <ViewerFrame>
        <Viewer {...props} />
      </ViewerFrame>
    </FirstViewRoot>
  )
}

export default FirstView
