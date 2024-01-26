import React from 'react'
import styled from 'styled-components'
import BeatToggle from './BeatToggle'
import BeatsPerMinute from './BeatsPerMinute'
import BeatChange from './BeatChange'
import BeatReset from './BeatReset'
import Subject from '../../observer/Subject'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  margin: 8px 0px;
`

const BeatChangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const onReset = () => {
  Subject.fire('reset')
}

const BeatControls = ({ onPlay, bpm, adjustBPM, changeColumns }) => (
  <Container>
    <BeatReset onClick={onReset} />
    <BeatToggle onClick={onPlay} />
    <BeatChangeContainer>
      <BeatChange
        style={{ marginBottom: 5 }}
        mode='add'
        onClick={() => changeColumns(1)}
      />
      <BeatChange
        style={{ marginTop: 5 }}
        mode='subtract'
        onClick={() => changeColumns(-1)}
      />
    </BeatChangeContainer>
    <BeatsPerMinute bpm={bpm} handleChange={adjustBPM} />
  </Container>
)

export default BeatControls
