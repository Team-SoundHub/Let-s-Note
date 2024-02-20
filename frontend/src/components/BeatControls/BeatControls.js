import React from "react";
import tw from "tailwind-styled-components";
import BeatToggle from "./BeatToggle";
import BeatsPerMinute from "./BeatsPerMinute";
import BeatsVolume from "./BeatVolume";
import InstrumentChange from "../InstrumentControl/InstrumentChange";
import BeatStop from "./BeatStop";
import BeatProgressBar from "./BeatProgressBar";

const Container = tw.div`
  z-10
  bg-white
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
  adjustVolume,
  changeInstrument,
  columns,
  count,
  handleIsPlaying,
  isPlaying,
  isSnapshot,
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
          onPlay={onPlay}
          handleIsPlaying={handleIsPlaying}
        />
      </CenterSection>
      <RightSection>
        <BeatsPerMinute bpm={bpm} handleChange={adjustBPM} />
        <BeatsVolume handleChange={adjustVolume} />

        {!isSnapshot && (
          <>
            <InstrumentChange
              instrument="piano"
              changeInstrument={changeInstrument}
            />
            <InstrumentChange
              instrument="guitar"
              changeInstrument={changeInstrument}
            />
          </>
        )}
      </RightSection>
    </Container>
  );
};

export default BeatControls;
