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
  mb-2
  mt-2
  border-2
`;

const LeftSection = tw.div`
  flex
  items-center
  gap-4
`;

const CenterSection = tw.div`
  flex
  flex-col
  w-[40%]
  items-center
`;

const RightSection = tw.div`
  flex
  items-center
  gap-4
`;

const BeatChangeContainer = tw.div`
  flex
  flex-col
  items-center
  justify-center
`;

const BeatControls = ({
  onPlay,
  onStop,
  bpm,
  adjustBPM,
  changeColumns,
  changeInstrument,
  columns,
  count,
  handleCountChange,
}) => {
  return (
    <Container>
      <LeftSection>
        <BeatToggle onClick={onPlay} />
        <BeatStop onClick={onStop} />
        <BeatChangeContainer>
          <BeatChange
            style={{ marginBottom: 5 }}
            mode="add"
            onClick={() => changeColumns(8)}
          />
          <BeatChange
            style={{ marginTop: 5 }}
            mode="subtract"
            onClick={() => changeColumns(-8)}
          />
        </BeatChangeContainer>
        {columns} 줄
      </LeftSection>
      <CenterSection>
        <BeatProgressBar
          columns={columns}
          count={count}
          handleCountChange={handleCountChange}
        />
        <BeatsPerMinute bpm={bpm} handleChange={adjustBPM} />
      </CenterSection>
      <RightSection>
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
