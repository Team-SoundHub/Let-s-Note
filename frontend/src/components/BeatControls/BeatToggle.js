import React, { Component } from 'react'
import styled from 'styled-components'
import BeatButton from './BeatButton'

const Play = styled.i`
  font-size: 24px;
  color: #363636;
  margin-left: ${props => (props.playing ? 0 : 4)}px;
`

class BeatToggle extends Component {
  state = { playing: false }

  onClick = () => {
    const { onClick } = this.props
    this.setState(
      prev => ({
        playing: !prev.playing
      }),
      onClick
    )
  }

  render () {
    const { playing } = this.state
    return (
      <BeatButton onClick={this.onClick}>
        <Play
          playing={playing}
          className={`fas ${playing ? 'fa-pause' : 'fa-play'}`}
        />
      </BeatButton>
    )
  }
}

BeatToggle.defaultProps = {
  onClick: () => null
}

export default BeatToggle
