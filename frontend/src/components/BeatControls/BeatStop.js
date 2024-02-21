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
        <svg
          width="1.5rem"
          height="1.5rem"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M17 19.75H7C6.27065 19.75 5.57118 19.4603 5.05546 18.9445C4.53973 18.4288 4.25 17.7293 4.25 17V7C4.25 6.27065 4.53973 5.57118 5.05546 5.05546C5.57118 4.53973 6.27065 4.25 7 4.25H17C17.7293 4.25 18.4288 4.53973 18.9445 5.05546C19.4603 5.57118 19.75 6.27065 19.75 7V17C19.75 17.7293 19.4603 18.4288 18.9445 18.9445C18.4288 19.4603 17.7293 19.75 17 19.75ZM7 5.75C6.66848 5.75 6.35054 5.8817 6.11612 6.11612C5.8817 6.35054 5.75 6.66848 5.75 7V17C5.75 17.3315 5.8817 17.6495 6.11612 17.8839C6.35054 18.1183 6.66848 18.25 7 18.25H17C17.3315 18.25 17.6495 18.1183 17.8839 17.8839C18.1183 17.6495 18.25 17.3315 18.25 17V7C18.25 6.66848 18.1183 6.35054 17.8839 6.11612C17.6495 5.8817 17.3315 5.75 17 5.75H7Z"
              fill="#ffffff"
            ></path>{" "}
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
