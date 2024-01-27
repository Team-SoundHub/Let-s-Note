import React from 'react'
import styled from 'styled-components'
import BeatButton from './BeatButton'

const ResetIcon = styled.i`
  font-size: 24px;
  color: #363636;
`

const BeatReset = ({ onClick }) => (
  <BeatButton onClick={onClick}>
    <ResetIcon className='fas fa-redo-alt' />
  </BeatButton>
)

export default BeatReset
