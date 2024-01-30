import React from "react";
import tw from "tailwind-styled-components";
import BeatButton from "./BeatButton";
import add from "../../assets/control/plus-large-svgrepo-com.svg";
import subtract from "../../assets/control/minus-svgrepo-com.svg";

const Arrows = tw.img`
  w-3
  h-3
`;

const BeatChange = ({ mode, onClick, style }) => {
  // Determine which icon to use based on the mode
  const icon = mode === "add" ? add : subtract;

  return (
    <BeatButton size={30} onClick={onClick} style={style}>
      <Arrows src={icon} alt={mode} />
    </BeatButton>
  );
};

export default BeatChange;
