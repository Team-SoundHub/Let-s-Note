import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { availableNotes } from "../../constants/scale";
// import drum from "../../assets/Instrument/drum1-svgrepo-com.svg";
import drum from "../../assets/Instrument/drum3.png";
import { clearClickedNotes } from "../../app/slices/innerContentSlice";

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
  transition: background-color 0.2s ease;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;

const WhiteKey = styled(PianoKey)`
  background-color: white;
  height: 2rem;
  width: 5rem;
  z-index: 20;
`;

const BlackKey = styled(PianoKey)`
  background-color: black;
  height: 1.5rem;
  width: 3rem;
  margin-top: -0.75rem;
  color: white;
  z-index: 30;
  border: 1px solid #fff;
  border-radius: 0 0 5px 5px;
`;

const MovedWhiteKey = styled(PianoKey)`
  background-color: white;
  height: 2.3rem;
  width: 5rem;
  margin-top: -0.75rem;
  z-index: 20;
`;

const FirstWhiteKey = styled(PianoKey)`
  background-color: white;
  height: 2rem;
  width: 5rem;
  margin-top: -0.75rem;
  margin-bottom: 0.2rem;
  z-index: 20;
`;

const FourthWhiteKey = styled(PianoKey)`
  background-color: white;
  height: 2rem;
  width: 5rem;
  margin-top: -0.75rem;
  z-index: 20;
`;

const LastWhiteKey = styled(PianoKey)`
  background-color: white;
  height: 2rem;
  width: 5rem;
  margin-top: -0.75rem;
  z-index: 20;
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
  height: 2.9rem;
  margin-top: 0.4rem;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

  &:hover {
    background-color: #e3a008;
  }

  img {
    width: 45px;
  }
`;

const VerticalPiano = ({ sendLoop, spaceLength }) => {
  const dispatch = useDispatch();
  const [highlightedKey, setHighlightedKey] = useState(null);
  const clickedNotes = useSelector((state) => state.innerContent.clickedNotes);
  const notes = [
    "도",
    "도#",
    "레",
    "레#",
    "미",
    "파",
    "파#",
    "솔",
    "솔#",
    "라",
    "라#",
    "시",
  ].reverse();

  useEffect(() => {
    if (clickedNotes !== null) {
      setHighlightedKey(clickedNotes);
      const timer = setTimeout(() => {
        dispatch(clearClickedNotes()); // Redux 스토어의 clickedNotes를 초기화하는 액션 디스패치
        setHighlightedKey(null);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [clickedNotes]);

  useEffect(() => {
    drawPianoKeys();
  }, []);

  function drawPianoKeys() {
    const pianoKeys = [];

    for (let i = 0; i < availableNotes.length; i++) {
      const note = availableNotes[i];
      const text = notes[i % 12] + Math.floor(5 - (i + 1) / 12);
      const isWhiteKey = !note.includes("#");

      // 하이라이트 이펙트 관련 로직
      const isHighlighted = i === highlightedKey;
      const highlitedStyle = isHighlighted
        ? { backgroundColor: "#49C5B6" }
        : {};

      if (!isWhiteKey) {
        pianoKeys.push(
          <BlackKey key={note} style={highlitedStyle}>
            {text}
          </BlackKey>
        );
      } else if (i === availableNotes.length - 1) {
        pianoKeys.push(
          <LastWhiteKey key={note} style={highlitedStyle}>
            {text}
          </LastWhiteKey>
        );
      } else if (["A", "G", "D"].includes(note.charAt(0))) {
        pianoKeys.push(
          <MovedWhiteKey key={note} style={highlitedStyle}>
            {text}
          </MovedWhiteKey>
        );
      } else if (["F"].includes(note.charAt(0))) {
        pianoKeys.push(
          <FourthWhiteKey key={note} style={highlitedStyle}>
            {text}
          </FourthWhiteKey>
        );
      } else if (["C"].includes(note.charAt(0))) {
        pianoKeys.push(
          <FirstWhiteKey
            className="margin-bottom: 0.2rem"
            key={note}
            style={highlitedStyle}
          >
            {text}
          </FirstWhiteKey>
        );
      } else {
        pianoKeys.push(
          <WhiteKey key={note} style={highlitedStyle}>
            {text}
          </WhiteKey>
        );
      }
    }

    // Render the piano keys
    return pianoKeys;
  }

  const handleDrumLoopClick = () => {
    sendLoop("drum", spaceLength - 1);
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
