import React from 'react'
import styled from 'styled-components'
import Viewer, { ViewerProps } from 'components/viewer'
import bgImg from 'assets/images/top-bg.jpg'

export interface FirstViewProps {
  heading: {
    titles: [string, string]
    subs: [string, string]
  }
  main: ViewerProps
}

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
  font-size: 56px;
  padding-top: 40px;
`

const Subtitle = styled.div`
  text-align: center;
  padding-top: 40px;
  color: rgb(255, 226, 53);
  font-size: 16px;
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

const FirstView = (props: FirstViewProps) => {
  return (
    <FirstViewRoot>
      <BackgroundImg />

      <Container>
        <div>
          <HeadingText>
            {props.heading.titles[0]}
            <br />
            {props.heading.titles[1]}
          </HeadingText>

          <Subtitle>
            {props.heading.subs[0]}
            <br />
            {props.heading.subs[1]}
          </Subtitle>
        </div>
      </Container>

      <ViewerFrame>
        <Viewer {...props.main} />
      </ViewerFrame>
    </FirstViewRoot>
  )
}

export default FirstView
