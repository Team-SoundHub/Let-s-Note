import React, { Component } from "react";
import tw from "tailwind-styled-components";
import BeatButton from "./BeatButton";
import stop from "../../assets/control/stop-svgrepo-com.svg";
import { resetCount } from "../BeatGrid/BeatGrid";

const Stop = tw.img`
  w-5
  h-5
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
    resetCount();
  };

  render() {
    const { playing } = this.state;
    return (
      <BeatButton onClick={this.onClick}>
        <Stop playing={playing} src={stop} />
      </BeatButton>
    );
  }
}

BeatStop.defaultProps = {
  onClick: () => null,
};

export default BeatStop;
