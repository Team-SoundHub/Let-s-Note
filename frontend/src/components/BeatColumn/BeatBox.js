import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  margin: 0.05rem;
  background-color: ${(props) =>
    props.active &&
    props.visualizeInstrument[
      props.instrumentList.indexOf(props.instrument)
    ] === true
      ? pickActiveColor(props.instrument)
      : props.col % 8 < 4
      ? "lightgray"
      : props.inactiveColor};
  width: 3rem;
  height: 1.2rem;

  margin-bottom: ${(props) => (props.row % 12 === 11 ? 0.2 : 0)}rem;
  opacity: ${(props) => (props.playing ? 0.7 : 1)};
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
  playing,
}) => {
  const dispatch = useDispatch();

  const [active, setActive] = useState(propActive);
  const [instrument, setInstrument] = useState("piano");

  const innerContent = useSelector((state) => state.innerContent.innerContent);
  const workspaceNotes = useSelector(
    (state) => state.innerContent.workspaceNotes
  );
  const snapshotNotes = useSelector(
    (state) => state.innerContent.snapshotNotes
  );

  // 처음 마운트 시 전역상태의 노트정보 반영
  useEffect(() => {
    let activeNote;

    if (isSnapshot) {
      activeNote = snapshotNotes.find((n) => n.x === col && n.y === row);
    } else {
      activeNote = workspaceNotes.find((n) => n.x === col && n.y === row);
    }

    // 해당하는 노트가 있으면 상태 업데이트
    if (activeNote && !active) {
      setActive(true);
      setInstrument(activeNote.instrument);
      setActiveBoxes(row, true);
      setActiveInstrument(row, activeNote.instrument);
    }
  }, [
    // useEffect 호출 조건을 다르게 줘서 마운트 이후에는 호출되지 않도록 함.
    snapshotNotes,
    workspaceNotes,
    col,
    row,
    // active,
    isSnapshot,
    // setActiveBoxes,
    // setActiveInstrument,
  ]);

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
      instrumentList={instrumentList}
      playing={playing}
    />
  );
};

BeatBox.defaultProps = {
  active: false,
  activeColor: "red",
  onClick: () => null,
};

export default BeatBox;
