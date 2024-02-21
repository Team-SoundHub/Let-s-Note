import React, { Component } from "react";
import tw from "tailwind-styled-components";
import BeatButton from "./BeatButton";
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
        <svg
          width="1.5rem"
          height="1.5rem"
          fill="#ffffff"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M8 8h16v16H8z"></path>
          </g>
        </svg>
      </BeatButton>
    );
  }
}

BeatStop.defaultProps = {
  onClick: () => null,
};

export default BeatStop;
