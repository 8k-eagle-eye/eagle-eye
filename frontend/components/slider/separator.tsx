import React, { useState, useCallback } from 'react'
import styled from 'styled-components'

export interface SeparatorProps {
  left: number
  updateLeft: CallableFunction
}

const Handle = styled.div`
  height: 38px;
  width: 38px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -22px;
  margin-top: -22px;
  border: 1px solid white;
  border-radius: 1000px;
  box-shadow: 0 0 12px rgba(51, 51, 51, 0.5);
  z-index: 3;
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.7);
  cursor: pointer;
`

const Separator = (props: SeparatorProps) => {
  const { left, updateLeft } = props
  const [drag, setDrag] = useState(false)
  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (drag) updateLeft(e.pageX)
    },
    [drag]
  )
  const onDrag = useCallback(() => setDrag(true), [])
  const offDrag = useCallback(() => setDrag(false), [])
  return (
    <Handle
      onMouseDown={onDrag}
      onMouseMove={onMouseMove}
      onMouseUp={offDrag}
      onMouseOut={offDrag}
      style={{ left }}
    />
  )
}

export default Separator
