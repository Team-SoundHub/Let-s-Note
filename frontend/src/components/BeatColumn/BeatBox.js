import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  margin: 0.1rem;
  background-color: ${(props) =>
    props.active &&
    props.visualizeInstrument[
      props.instrumentList.indexOf(props.instrument)
    ] === true
      ? pickActiveColor(props.instrument)
      : props.col % 8 < 4
      ? "lightgray"
      : props.inactiveColor};
  width: 1.5rem;
  height: 1.5rem;

  margin-bottom: ${(props) => (props.row % 12 === 11 ? 0.2 : 0)}rem;
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
}) => {
  const [active, setActive] = useState(propActive);
  const [instrument, setInstrument] = useState("piano");

  const innerContent = useSelector((state) => state.innerContent.innerContent);
  const notes = useSelector((state) => state.innerContent.notes);
  const snapshotNotes = useSelector(
    (state) => state.innerContent.snapshotNotesList
  );
  const stateInner = useSelector((state) => state.innerContent);

  // const notes = useSelector(state =>
  //   isSnapshot ? state.innerContent.snapshotNotesList : state.innerContent.notesList
  // );

  // useEffect(() => {
  //   // notes 배열을 검사하여 현재 BeatBox 위치에 해당하는 노트가 있는지 확인
  //   // console.log("instrumentData:", instrumentData.snapshotNotesList);
  //   console.log("BeatBox - snapshotNotes:", stateInner);

  //   if (isSnapshot){
  //     const activeNote = snapshotNotes.find((n) => n.x === col && n.y === row);
  //     if (activeNote && !active) {
  //       // 해당하는 노트가 있으면, isActive 상태를 true로 설정
  //       setActive(true);
  //       setInstrument(activeNote.instrument);
  //       setActiveBoxes(row, true);
  //       setActiveInstrument(row, activeNote.instrument);
  //     }
  //   } else {
  //     const activeNote = notes.find((n) => n.x === col && n.y === row);
  //     if (activeNote && !active) {
  //       // 해당하는 노트가 있으면, isActive 상태를 true로 설정
  //       setActive(true);
  //       setInstrument(activeNote.instrument);
  //       setActiveBoxes(row, true);
  //       setActiveInstrument(row, activeNote.instrument);
  //     }
  //   }
  // }, [notes, col, row, setActiveBoxes, setActiveInstrument]);

  useEffect(() => {
    let activeNote;

    // 스냅샷 모드인 경우
    if (isSnapshot) {
      // 스냅샷 노트 리스트에서 현재 위치에 해당하는 노트 찾기
      activeNote = snapshotNotes.find((n) => n.x === col && n.y === row);
      // console.log("snapshot의 activeNote:", activeNote);
    } else {
      // 워크스페이스 모드인 경우
      activeNote = notes.find((n) => n.x === col && n.y === row);
      // console.log("workspace의 activeNote:", activeNote);
    }

    // 해당하는 노트가 있으면 상태 업데이트
    if (activeNote && !active) {
      setActive(true);
      setInstrument(activeNote.instrument);
      setActiveBoxes(row, true);
      setActiveInstrument(row, activeNote.instrument);
    }
  }, [
    snapshotNotes,
    notes,
    col,
    row,
    active,
    isSnapshot,
    setActiveBoxes,
    setActiveInstrument,
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
    />
  );
};

BeatBox.defaultProps = {
  active: false,
  activeColor: "red",
  onClick: () => null,
};

export default BeatBox;
