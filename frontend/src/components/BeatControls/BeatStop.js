import React, { Component } from "react";
import styled from "styled-components";
import BeatButton from "./BeatButton";

const Stop = styled.i`
  font-size: 24px;
  color: #363636;
  margin-left: ${(props) => (props.playing ? 0 : 4)}px;
`;

class BeatStop extends Component {
  state = { playing: false };

  onClick = () => {
    const { onClick } = this.props;
    this.setState(
      (prev) => ({
        playing: !prev.playing,
      }),
      onClick
    );
  };

  render() {
    const { playing } = this.state;
    return (
      <BeatButton onClick={this.onClick}>
        <Stop playing={playing} className={"fas fa-stop"} />
        정지
      </BeatButton>
    );
  }
}

BeatStop.defaultProps = {
  onClick: () => null,
};

export default BeatStop;
