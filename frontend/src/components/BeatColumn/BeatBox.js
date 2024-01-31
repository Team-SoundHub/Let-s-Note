import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  margin: 0.5px;
  background-color: ${(props) =>
    props.active[props.instrumentEnum[props.instrument]] &&
    props.visualizeInstrument[props.instrumentEnum[props.instrument]] === true
      ? pickActiveColor(props.instrument)
      : props.col % 8 < 4
      ? "lightgray"
      : props.inactiveColor};
  width: 2rem;
  margin-bottom: ${(props) => (props.row % 8 === 5 ? 2 : 0.5)}px;
`;

const pickActiveColor = (instrument) => {
  switch (instrument) {
    case "piano":
      return "rgb(248 113 113)";
    case "guitar":
      return "rgb(74 222 128)";
    case "drum":
      return "rgb(250 204 21)";
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
  isSnapshot,
  instrumentEnum,
}) => {
  const [active, setActive] = useState(propActive);
  const [instrument, setInstrument] = useState("piano");

  const innerContent = useSelector((state) => state.innerContent.innerContent);
  const notes = useSelector((state) => state.innerContent.notes);

  // useEffect(() => {
  //   // notes 배열을 검사하여 현재 BeatBox 위치에 해당하는 노트가 있는지 확인
  //   const instrumentIndex = instrumentEnum[innerContent.instrument];
  //   const activeNote = notes.find((n) => n.x === col && n.y === row);
  //   if (activeNote && !active) {
  //     // 해당하는 노트가 있으면, isActive 상태를 true로 설정
  //     setActive((prevActive) => {
  //       const newActive = [...(prevActive || [])];
  //       newActive[instrumentIndex] = !newActive[instrumentIndex];
  //       return newActive;
  //     });
  //     setInstrument(activeNote.instrument);
  //     // setActiveBoxes(row, true);
  //     setActiveInstrument(row, activeNote.instrument);
  //   }
  // }, [notes, col, row, setActiveBoxes, setActiveInstrument]);

  const handleClick = () => {
    if (isSnapshot) {
      // isSnapshot이 true일 경우 onClick 이벤트 무시
      return;
    }

    onClick && onClick();
  };

  useEffect(() => {
    // Check if x and y match col and row
    const instrumentIndex = instrumentEnum[innerContent.instrument];

    if (innerContent.x === col && innerContent.y === row) {
      // Toggle the value at the specified instrumentIndex
      setActive((prevActive) => {
        const newActive = [...(prevActive || [])];
        newActive[instrumentIndex] = !newActive[instrumentIndex];
        // setActiveBoxes(row, newActive);
        return newActive;
      });

      // Set other state variables accordingly
      if (!active[instrumentIndex]) {
        setInstrument(innerContent.instrument);
      } else {
        setInstrument(undefined);
      }
    }
  }, [innerContent]);

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
      row={row}
      instrumentEnum={instrumentEnum}
    />
  );
};

BeatBox.defaultProps = {
  active: false,
  activeColor: "red",
  onClick: () => null,
};

export default BeatBox;
