import React, { Component } from "react";
import tw from "tailwind-styled-components";
import BeatButton from "./BeatButton";
import play from "../../assets/control/play-svgrepo-com.svg";
import pause from "../../assets/control/pause-svgrepo-com.svg";

const Play = tw.img`
  w-5
  h-5
`;

class BeatToggle extends Component {
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
    const iconSrc = playing ? pause : play;
    return (
      <BeatButton onClick={this.onClick}>
        <Play src={iconSrc} />
      </BeatButton>
    );
  }
}

BeatToggle.defaultProps = {
  onClick: () => null,
};

export default BeatToggle;
