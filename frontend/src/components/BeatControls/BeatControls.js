import React from "react";
import tw from "tailwind-styled-components";
import BeatToggle from "./BeatToggle";
import BeatsPerMinute from "./BeatsPerMinute";
import BeatChange from "./BeatChange";
import InstrumentChange from "../InstrumentControl/InstrumentChange";
import BeatStop from "./BeatStop";
import BeatProgressBar from "./BeatProgressBar";

const Container = tw.div`
  flex
  items-center
  justify-between
  w-full
  px-4
  mt-1
  border-2
`;

const LeftSection = tw.div`
  flex
  items-center
  justify-center
  gap-4
`;

const CenterSection = tw.div`
  flex
  flex-col
  w-[50%]
  items-center
`;

const RightSection = tw.div`
  flex
  items-center
  justify-center
  gap-4
`;

const BeatControls = ({
  onPlay,
  onStop,
  bpm,
  adjustBPM,
  changeInstrument,
  columns,
  count,
  handleCountChange,
  handleIsPlaying,
  isPlaying,
}) => {
  return (
    <Container>
      <LeftSection>
        <BeatToggle
          onClick={onPlay}
          isPlaying={isPlaying}
          handleIsPlaying={handleIsPlaying}
        />
        <BeatStop onClick={onStop} />
      </LeftSection>
      <CenterSection>
        <BeatProgressBar
          columns={columns}
          count={count}
          handleCountChange={handleCountChange}
        />
      </CenterSection>
      <RightSection>
        <BeatsPerMinute bpm={bpm} handleChange={adjustBPM} />
        <InstrumentChange
          instrument="piano"
          changeInstrument={changeInstrument}
        />
        <InstrumentChange
          instrument="guitar"
          changeInstrument={changeInstrument}
        />
        <InstrumentChange
          instrument="drum"
          changeInstrument={changeInstrument}
        />
      </RightSection>
    </Container>
  );
};

export default BeatControls;
