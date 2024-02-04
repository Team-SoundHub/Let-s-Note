import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { availableNotes } from "../../constants/scale";
// import drum from "../../assets/Instrument/drum1-svgrepo-com.svg";
import drum from "../../assets/Instrument/drum3.png";

const PianoContainer = styled.div`
  display: flex-row;
`;

const PianoKey = styled.div`
  border: 1px solid #000;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const WhiteKey = styled(PianoKey)`
  background-color: white;
  height: 2.35rem;
  width: 5rem;
  z-index: 2;
`;

const BlackKey = styled(PianoKey)`
  background-color: black;
  height: 1.5rem;
  width: 3rem;
  margin-top: -0.75rem;
  color: white;
  z-index: 3;
  border: 1px solid #fff;
  border-radius: 0 0 5px 5px;
`;

const MovedWhiteKey = styled(PianoKey)`
  background-color: white;
  height: 3.2rem;
  width: 5rem;
  margin-top: -0.75rem;
  z-index: 2;
`;

const FirstWhiteKey = styled(PianoKey)`
  background-color: white;
  height: 2.55rem;
  width: 5rem;
  margin-top: -0.75rem;
  margin-bottom: 0.2rem;
  z-index: 2;
`;

const FourthWhiteKey = styled(PianoKey)`
  background-color: white;
  height: 2.35rem;
  width: 5rem;
  margin-top: -0.75rem;
  z-index: 2;
`;

const LastWhiteKey = styled(PianoKey)`
  background-color: white;
  height: 2.45rem;
  width: 5rem;
  margin-top: -0.75rem;
  z-index: 2;
`;

const DrumButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  cursor: pointer;
  border: 1px solid #000;  
  transition: background-color 0.3s ease;
  height: 3.1rem;

  &:hover {
    background-color: #E3A008; 
  }

  img {
      width: 45px;             
  }
  
`;


const VerticalPiano = ({sendLoop, spaceLength}) => {
  useEffect(() => {
    drawPianoKeys();
  }, []);

  function drawPianoKeys() {
    const pianoKeys = [];

    for (let i = 0; i < availableNotes.length; i++) {
      const note = availableNotes[i];
      const isWhiteKey = !note.includes("#");

      if (!isWhiteKey) {
        pianoKeys.push(<BlackKey key={note}>{note}</BlackKey>);
      } else if (i === availableNotes.length - 1) {
        pianoKeys.push(<LastWhiteKey key={note}>{note}</LastWhiteKey>);
      } else if (["A", "G", "D"].includes(note.charAt(0))) {
        pianoKeys.push(<MovedWhiteKey key={note}>{note}</MovedWhiteKey>);
      } else if (["F"].includes(note.charAt(0))) {
        pianoKeys.push(<FourthWhiteKey key={note}>{note}</FourthWhiteKey>);
      } else if (["C"].includes(note.charAt(0))) {
        pianoKeys.push(
          <FirstWhiteKey className="margin-bottom: 0.2rem" key={note}>
            {note}
          </FirstWhiteKey>
        );
      } else {
        pianoKeys.push(<WhiteKey key={note}>{note}</WhiteKey>);
      }
    }

    // Render the piano keys
    return pianoKeys;
  }

  const handleDrumLoopClick = () => {
    sendLoop("drum", spaceLength-1);
    console.log("Drum loop clicked!", spaceLength);
  };

  return (
    <PianoContainer>
      {drawPianoKeys()}
      <DrumButton onClick={handleDrumLoopClick}>
        <img src={drum} alt="Drum" />        
      </DrumButton>
    </PianoContainer>
  );
};

export default VerticalPiano;
