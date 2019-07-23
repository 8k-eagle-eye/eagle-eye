import React from 'react'
import styled, { css } from 'styled-components'
import Feature, { FeatureProps } from 'components/public/feature'

export interface FeatureListProps {
  items: FeatureProps[]
}

const gridColumnCount = 2
const gridRowCount = 3

const List = styled.div`
  display: grid;
  column-gap: 2em;

  > :nth-child(${`${gridRowCount}n + ${gridColumnCount * gridRowCount + 1}`}) {
    margin-top: 2em;
  }

  ${({ items }: FeatureListProps) => {
    let styles = `
        grid-template-columns: repeat(${gridColumnCount}, 1fr);
        grid-template-rows: repeat(${gridRowCount}, auto);
      `

    for (let i = 0; i < items.length; i++) {
      const currnetColumn = (i % gridColumnCount) + 1
      const currnetRowGroup = Math.floor(i / gridColumnCount) + 1

      for (let j = 1; j <= gridRowCount; j++) {
        styles += `
          > :nth-child(${i * gridRowCount + j}) {
            grid-column: ${currnetColumn};
            grid-row: ${j + currnetRowGroup * gridRowCount};
          }
        `
      }
    }

    return css`
      ${styles}
    `
  }}

  @media screen and (max-width: 640px) {
    display: block;

    > :nth-child(${`${gridRowCount}n + ${gridRowCount + 1}`}) {
      margin-top: 2em;
    }
  }
`

const FeatureList = (props: FeatureListProps) => (
  <List {...props}>
    {props.items.map(({ heading, description, icon }) => (
      <Feature key={heading} {...{ heading, description, icon }} />
    ))}
  </List>
)

export default FeatureList
