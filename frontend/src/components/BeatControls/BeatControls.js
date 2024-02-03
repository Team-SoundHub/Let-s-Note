import React from "react";
import tw from "tailwind-styled-components";
import BeatToggle from "./BeatToggle";
import BeatsPerMinute from "./BeatsPerMinute";
import BeatChange from "./BeatChange";
import BeatReset from "./BeatReset";
import Subject from "../../observer/Subject";
import InstrumentChange from "../InstrumentControl/InstrumentChange";
import BeatStop from "./BeatStop";
import { sendInstrumentReset } from "../../containers/WebSocket/WebSocketContainer";

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

const onReset = () => {
  Subject.fire("reset");
};

const BeatControls = ({
  onPlay,
  onStop,
  bpm,
  adjustBPM,
  changeColumns,
  changeInstrument,
  progress,
}) => {
  return (
    <Container>
      <LeftSection>
        <BeatReset onClick={onReset} />
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
      </LeftSection>
      <BeatsPerMinute bpm={bpm} handleChange={adjustBPM} />
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
