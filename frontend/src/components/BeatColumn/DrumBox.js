import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  margin: 0.5px;
  background-color: ${(props) =>
    props.active &&
    props.active[props.instrumentEnum["drum"]] &&
    props.visualizeInstrument[props.instrumentEnum["drum"]] === true
      ? pickActiveColor("drum")
      : props.inactiveColor};
  width: 2rem;
  margin-bottom: ${(props) => (props.row % 7 === 0 ? 2 : 0.5)}px;
  position: relative; /* Ensure the circle is positioned relative to this container */

  &::after {
    content: ""; /* Create a pseudo-element for the circle */
    display: ${(props) =>
      props.active &&
      props.visualizeInstrument[props.instrumentEnum["drum"]] === true
        ? "none" // Hide the circle when the condition is satisfied
        : "block"};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${(props) =>
      props.row % 2 === 0
        ? "0.5rem"
        : "0.8rem"}; /* Adjust the width of the circle based on the condition */
    height: ${(props) =>
      props.row % 2 === 0
        ? "0.5rem"
        : "0.8rem"}; /* Adjust the height of the circle based on the condition */
    background-color: lightgray; /* Set the background color of the circle */
    border-radius: 50%; /* Make it a circle */
  }
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

const DrumBox = ({
  active: propActive,
  note,
  onClick,
  inactiveColor,
  activeColor,
  setActiveBoxes,
  setActiveInstrument,
  visualizeInstrument,
  instrumentEnum,
  col,
  row,
}) => {
  const [active, setActive] = useState(propActive);
  const innerContent = useSelector((state) => state.innerContent.innerContent);
  const notes = useSelector((state) => state.innerContent.notes);

  // useEffect(() => {
  //   // notes 배열을 검사하여 현재 BeatBox 위치에 해당하는 노트가 있는지 확인
  //   const activeNote = notes.find((n) => n.x === col && n.y === row);
  //   if (activeNote && !active) {
  //     // 해당하는 노트가 있으면, isActive 상태를 true로 설정
  //     setActive(true);
  //     // setActiveBoxes(row, true);
  //     setActiveInstrument(row, activeNote.instrument);
  //   }
  // }, [notes, col, row, setActiveBoxes, setActiveInstrument]);

  useEffect(() => {
    const instrumentIndex = instrumentEnum[innerContent.instrument];

    if (
      innerContent.instrument === "drum" &&
      innerContent.x === col &&
      innerContent.y === row
    ) {
      setActive((prevActive) => {
        const newActive = [...(prevActive || [])];
        newActive[instrumentIndex] = !newActive[instrumentIndex];
        setActiveBoxes(row, newActive);
        return newActive;
      });

      if (!active) {
        setActiveInstrument(row, innerContent.instrument);
      } else {
        setActiveInstrument(row, undefined);
      }
    }
  }, [innerContent]);

  return (
    <Container
      active={active}
      activeColor={activeColor}
      inactiveColor={inactiveColor}
      onClick={() => (onClick === null ? null : onClick())}
      visualizeInstrument={visualizeInstrument}
      instrumentEnum={instrumentEnum}
      row={row}
    />
  );
};

export default DrumBox;
