import React, { Component } from "react";
import tw from "tailwind-styled-components";
import BeatButton from "./BeatButton";

const Container = tw.div`
  flex
  items-center
  justify-center
`;

class BeatToggle extends Component {
  onClick = () => {
    const { onClick, handleIsPlaying } = this.props;
    onClick();
    handleIsPlaying();
  };

  render() {
    const { isPlaying } = this.props;
    return (
      <Container>
        <BeatButton onClick={this.onClick}>
          {isPlaying ? (
            <svg
              width="1.5rem"
              height="1.5rem"
              fill="#ffffff"
              viewBox="0 0 32 32"
              version="1.1"
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
                <title>pause</title>{" "}
                <path d="M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.44 0.576t-0.576 1.44v16.16zM18.016 24.096q0 0.832 0.608 1.408t1.408 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.408 0.576t-0.608 1.44v16.16z"></path>{" "}
              </g>
            </svg>
          ) : (
            <svg
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.25 3l1.166-.624 8 5.333v1.248l-8 5.334-1.166-.624V3zm1.5 1.401v7.864l5.898-3.932L5.75 4.401z"
                ></path>
              </g>
            </svg>
          )}
        </BeatButton>
      </Container>
    );
  }
}

BeatToggle.defaultProps = {
  onClick: () => null,
};

export default BeatToggle;
