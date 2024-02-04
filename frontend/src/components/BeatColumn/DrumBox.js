import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  margin: 0.1rem;
  background-color: ${(props) =>
    props.active &&
    props.visualizeInstrument[props.instrumentList.indexOf("drum")] === true
      ? pickActiveColor("drum")
      : props.inactiveColor};
  width: 3rem;
  height: 3rem;
  margin-bottom: ${(props) => (props.row % 7 === 0 ? 2 : 0)}rem;
  position: relative; /* Ensure the circle is positioned relative to this container */

  &::after {
    content: ""; /* Create a pseudo-element for the circle */
    display: ${(props) =>
      props.active &&
      props.visualizeInstrument[props.instrumentList.indexOf("drum")] === true
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

// const Container = styled.div`
//   flex: 1;
//   margin: 0.1rem;
//   background-color: ${(props) =>
//     props.active &&
//     props.visualizeInstrument[
//       props.instrumentList.indexOf(props.instrument)
//     ] === true
//       ? pickActiveColor(props.instrument)
//       : props.col % 8 < 4
//       ? "lightgray"
//       : props.inactiveColor};
//   width: 2rem;
//   height: 2rem;

//   margin-bottom: ${(props) => (props.row % 12 === 11 ? 0.2 : 0)}rem;
// `;

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
  col,
  row,
  isSnapshot,
}) => {
  const [active, setActive] = useState(propActive);
  const innerContent = useSelector((state) => state.innerContent.innerContent);
  const instrumentList = ["piano", "guitar", "drum"];
  const workspaceNotes = useSelector(
    (state) => state.innerContent.workspaceNotes
  );
  const snapshotNotes = useSelector(
    (state) => state.innerContent.snapshotNotes
  );

  useEffect(() => {
    let activeNote;

    if (isSnapshot) {
      activeNote = snapshotNotes.find((n) => n.x === col && n.y === row);
      // console.log("스냅샷 드럼:", activeNote);
    } else {
      activeNote = workspaceNotes.find((n) => n.x === col && n.y === row);
      // console.log("작업실 드럼:", activeNote);
    }

    if (activeNote && !active) {
      // 해당하는 노트가 있으면 상태 업데이트
      setActive(true);
      setActiveBoxes(row, true);
      setActiveInstrument(row, activeNote.instrument);
    }
  }, [
    snapshotNotes,
    workspaceNotes,
    col,
    row,
    // active,
    isSnapshot,
    // setActiveBoxes,
    // setActiveInstrument,
  ]);

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
      visualizeInstrument={visualizeInstrument}
      instrumentList={instrumentList}
      row={row}
    />
  );
};

export default DrumBox;
