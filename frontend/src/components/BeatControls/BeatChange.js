import React from "react";
import tw from "tailwind-styled-components";
import BeatButton from "./BeatButton";
import add from "../../assets/control/plus-large-svgrepo-com.svg";
import subtract from "../../assets/control/minus-svgrepo-com.svg";

const ButtonContainer = tw.div`
  flex
  w-16
  h-16
  justify-center
  items-center
`;

const Arrows = tw.img`
  w-3
  h-3
`;

const BeatChange = ({ mode, onClick, style }) => {
  // Determine which icon to use based on the mode
  const icon = mode === "add" ? add : subtract;

  return (    
    <ButtonContainer>
      {/* <BeatButton  style={style}> */}
      <Arrows onClick={onClick} src={icon} alt={mode} />
      {/* </BeatButton> */}
    </ButtonContainer>
  );
};

export default BeatChange;
