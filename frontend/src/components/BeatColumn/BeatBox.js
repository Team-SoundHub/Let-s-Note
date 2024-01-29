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
      ? pickActiveColor(props.note, props.instrument)
      : props.inactiveColor};
  width: 3rem;
`;

const pickActiveColor = (note, instrument) => {
  let letter = note.split("")[0];
  switch (letter) {
    case "A":
      return instrument === "piano" ? "#DFCC2B" : "#FF0000";
    case "B":
      return instrument === "piano" ? "#3BD531" : "#00FF00";
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
  col,
  row,
}) => {
  const [active, setActive] = useState(propActive);
  const [instrument, setInstrument] = useState("piano");

  const innerContent = useSelector((state) => state.innerContent.innerContent);

  useEffect(() => {
    if (propActive) {
      setInstrument(activeInstrument);
    }
  }, [propActive]);

  useEffect(() => {
    // Check if x and y match col and row
    if (innerContent.x === col && innerContent.y === row && !active) {
      setActive(true);
      setInstrument(innerContent.instrument);
      setActiveBoxes(row, true);
      setActiveInstrument(row, innerContent.instrument);
    } else if (innerContent.x === col && innerContent.y === row && active) {
      setActive(false);
      setInstrument(innerContent.instrument);
      setActiveBoxes(row, false);
      setActiveInstrument(row, null);
    }
  }, [innerContent]);

  return (
    <Container
      active={active}
      activeColor={activeColor}
      inactiveColor={inactiveColor}
      onClick={() => {
        setActive(!active);
        onClick();
      }}
      instrument={instrument}
      activeInstrument={activeInstrument}
      note={note}
    />
  );
};

BeatBox.defaultProps = {
  active: false,
  activeColor: "red",
  onClick: () => null,
  instrument: "piano",
};

export default BeatBox;
