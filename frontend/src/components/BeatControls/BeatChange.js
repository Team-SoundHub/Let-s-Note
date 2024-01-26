import React from 'react'
import styled from 'styled-components'
import BeatButton from './BeatButton'

const Arrows = styled.i`
  font-size: 18px;
  color: #363636;
`

const BeatChange = ({ mode, onClick, style }) => (
  <BeatButton size={30} onClick={onClick} style={style}>
    <Arrows
      className={`fas fa-${mode === 'add' ? 'plus' : 'minus'}`}
      mode={mode}
    />
  </BeatButton>
)

export default BeatChange
