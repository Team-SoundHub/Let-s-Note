import React from "react";
import tw from "tailwind-styled-components";
import BeatButton from "./BeatButton";
import reset from "../../assets/control/reset-svgrepo-com.svg";

const Container = tw.div`
  ml-2
  items-center
`;

const ResetIcon = tw.img`
  w-5
  h-5
`;

const BeatReset = ({ onClick }) => (
  <Container>
    <BeatButton onClick={onClick}>
      <ResetIcon src={reset} />
    </BeatButton>
  </Container>
);

export default BeatReset;
