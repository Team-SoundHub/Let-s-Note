import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  margin: 0.5px;
  background-color: ${(props) =>
    props.active &&
    props.visualizeInstrument[
      props.instrumentList.indexOf(props.instrument)
    ] === true
      ? pickActiveColor(props.instrument)
      : props.col % 8 < 4
      ? "lightgray"
      : props.inactiveColor};
  width: 2rem;

  margin-bottom: ${(props) => (props.row % 7 === 0 ? 2 : 0.5)}px;
`;

const pickActiveColor = (instrument) => {
  switch (instrument) {
    case "piano":
      return "rgb(248 113 113)";
    case "guitar":
      return "rgb(74 222 128)";
    case "drum":
      return "rgb(250 204 21)";
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
  isSnapshot,
}) => {
  const [active, setActive] = useState(propActive);
  const [instrument, setInstrument] = useState("piano");

  const innerContent = useSelector((state) => state.innerContent.innerContent);

  const instrumentList = ["piano", "guitar", "drum"];

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
      instrumentList={instrumentList}
    />
  );
};

BeatBox.defaultProps = {
  active: false,
  activeColor: "red",
  onClick: () => null,
};

export default BeatBox;
