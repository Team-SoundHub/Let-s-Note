import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  margin: 0.5px;
  background-color: ${(props) =>
    props.active &&
    (props.visualizeInstrument === "All" ||
      props.visualizeInstrument === props.instrument)
      ? pickActiveColor(props.instrument)
      : props.col % 8 < 4
      ? "lightgray"
      : props.inactiveColor};
  width: 3rem;

  margin-bottom: ${(props) => (props.row % 7 === 0 ? 2 : 0.5)}px;
`;

const pickActiveColor = (instrument) => {
  switch (instrument) {
    case "piano":
      return "#FF0000";
    case "guitar":
      return "#00FF00";
    case "C":
      return instrument === "piano" ? "#2929DF" : "#0000FF";
    case "D":
      return "#DF9329";
    case "E":
      return "#6CBBD5";
    case "F":
      return "#C82F3C";
    case "G":
      return "#8350DF";
    default:
      return "black";
  }
};

const BeatBox = ({
  active: propActive,
  note,
  onClick,
  inactiveColor,
  activeColor,
  activeInstrument,
  setActiveBoxes,
  setActiveInstrument,
  visualizeInstrument,
  col,
  row,
  isSnapshot
}) => {
  const [active, setActive] = useState(propActive);
  const [instrument, setInstrument] = useState("piano");

  const innerContent = useSelector((state) => state.innerContent.innerContent);
  const notes = useSelector((state) => state.innerContent.notes);

  useEffect(() => {    
    // notes 배열을 검사하여 현재 BeatBox 위치에 해당하는 노트가 있는지 확인
    const activeNote = notes.find(n => n.x === col && n.y === row);
    if (activeNote && !active) {      
      // 해당하는 노트가 있으면, isActive 상태를 true로 설정
      setActive(true);
      setInstrument(activeNote.instrument);  
      setActiveBoxes(row, true);
      setActiveInstrument(row, activeNote.instrument); 
    }
  }, [notes, col, row, setActiveBoxes, setActiveInstrument]);

  const handleClick = () => {
    if (isSnapshot) {
      // isSnapshot이 true일 경우 onClick 이벤트 무시
      return;
    }
    onClick && onClick();
  };

  useEffect(() => {
    // Check if x and y match col and row
    if (innerContent.x === col && innerContent.y === row && !active) {
      console.log(`노트 찍기: x: ${innerContent.x}, y:${innerContent.y}`)
      setActive(true);
      setInstrument(innerContent.instrument);
      setActiveBoxes(row, true);
      setActiveInstrument(row, innerContent.instrument);
    } else if (innerContent.x === col && innerContent.y === row && active) {
      setActive(false);
      setInstrument(undefined);
      setActiveBoxes(row, false);
      setActiveInstrument(row, undefined);
    }
  }, [innerContent]);

  useEffect(() => {
    console.log("instrument: ", instrument);
  }, [instrument]);

  return (
    <Container
      active={active}
      activeColor={activeColor}
      inactiveColor={inactiveColor}
      onClick={handleClick}
      instrument={instrument}
      activeInstrument={activeInstrument}
      visualizeInstrument={visualizeInstrument}
      note={note}
      col={col}
    />
  );
};

BeatBox.defaultProps = {
  active: false,
  activeColor: "red",
  onClick: () => null,
};

export default BeatBox;
