import React, { Component } from "react";
import tw from "tailwind-styled-components";
import BeatButton from "./BeatButton";
import play from "../../assets/control/play-svgrepo-com.svg";
import pause from "../../assets/control/pause-svgrepo-com.svg";

const Container = tw.div`
  flex
  items-center
  justify-center
`;

const Play = tw.img`
  w-5
  h-5
`;

class BeatToggle extends Component {
  onClick = () => {
    const { onClick, handleIsPlaying } = this.props;
    onClick();
    handleIsPlaying();
  };

  render() {
    const { isPlaying } = this.props;
    const iconSrc = isPlaying ? pause : play;
    return (
      <Container>
        <BeatButton onClick={this.onClick}>
          <Play src={iconSrc} />
        </BeatButton>
      </Container>
    );
  }
}

BeatToggle.defaultProps = {
  onClick: () => null,
};

export default BeatToggle;
