import React from "react";
import tw from "tailwind-styled-components";
import piano from "../../assets/Instrument/piano-svgrepo-com.svg";
import guitar from "../../assets/Instrument/guitar-svgrepo-com.svg";
import drum from "../../assets/Instrument/drum-svgrepo-com.svg";

const Container = tw.div`
  flex
  items-center
  justify-center
  mx-1
`;

const Button = tw.button`
  text-black
  hover:bg-red-800
  focus:outline-none
  focus:ring-4
  focus:ring-red-300
  font-medium
  rounded-full
  text-sm
  px-2.5
  py-2.5
  text-center
  dark:hover:bg-red-700
  dark:focus:ring-red-900
`;

const Image = tw.img`
  w-5
  h-5
`;

const InstrumentChange = ({ instrument, changeInstrument }) => {
  const getBgColor = (instrument) => {
    switch (instrument) {
      case "piano":
        return "bg-[#FFA1A1]";
      case "guitar":
        return "bg-[#4886FF]";
      case "drum":
        return "bg-yellow-400";
      case "all":
        return "bg-white";
      default:
        return "bg-white";
    }
  };

  const renderContent = (instrument) => {
    if (instrument === "All") {
      return "All";
    } else {
      return (
        <Image
          src={
            instrument === "piano"
              ? piano
              : instrument === "guitar"
              ? guitar
              : drum
          }
          alt={instrument}
        />
      );
    }
  };

  return (
    <Container>
      <Button
        className={getBgColor(instrument)}
        onClick={() => changeInstrument(instrument)}
      >
        {renderContent(instrument)}
      </Button>
    </Container>
  );
};

export default InstrumentChange;
