import React, { HTMLAttributes, ReactNode } from 'react'
import { styled } from 'assets/styles/theme'

export interface WrapperProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
}

const StyledWrapper = styled.div`
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

const Wrapper = (props: WrapperProps) => <StyledWrapper {...props} />

export default Wrapper
