import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  margin: 0.5px;
  background-color: ${(props) =>
    props.active &&
    (props.activeInstrument === "All" ||
      props.activeInstrument === props.instrument)
      ? pickActiveColor(props.instrument)
      : props.col % 8 < 4
      ? "lightgray"
      : props.inactiveColor};
  width: 3rem;
`;

const pickActiveColor = (instrument) => {
  switch (instrument) {
    case "piano":
      return "#FF0000";
    case "guitar":
      return "#00FF00";
    case "drum":
      return "#0000FF";
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

const DrumBox = ({
  active: propActive,
  note,
  onClick,
  inactiveColor,
  activeColor,
  activeInstrument,
  setActiveBoxes,
  setActiveInstrument,
  scaleLength,
  col,
  row,
}) => {
  const [active, setActive] = useState(propActive);
  const innerContent = useSelector((state) => state.innerContent.innerContent);
  const notes = useSelector((state) => state.innerContent.notes);

  useEffect(() => {    
    // notes 배열을 검사하여 현재 BeatBox 위치에 해당하는 노트가 있는지 확인
    const activeNote = notes.find(n => n.x === col && n.y === row);
    if (activeNote && !active) {
      console.log(`activeNote: x:${activeNote.x} y:${activeNote.y} inst:${activeNote.instrument}`);
      // 해당하는 노트가 있으면, isActive 상태를 true로 설정
      setActive(true);      
      setActiveBoxes(row, true);
      setActiveInstrument(row, activeNote.instrument); 
    }
  }, [notes, col, row, setActiveBoxes, setActiveInstrument]);

  useEffect(() => {    
    if (
      innerContent.instrument === "drum" &&
      innerContent.x === col &&
      innerContent.y === row &&
      !active
    ) {
      setActive(true);
      setActiveBoxes(row, true);
      setActiveInstrument(row, innerContent.instrument);
    } else if (
      innerContent.instrument === "drum" &&
      innerContent.x === col &&
      innerContent.y === row &&
      active
    ) {
      setActive(false);
      setActiveBoxes(row, false);
      setActiveInstrument(row, undefined);
    }
  }, [innerContent]);
  return (
    <Container
      active={active}
      activeColor={activeColor}
      inactiveColor={inactiveColor}
      onClick={() => (onClick === null ? null : onClick())}
      note={note}
      col={col}
    />
  );
};

export default DrumBox;
