import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { setHoverPosition } from "../../app/slices/cursorSlice";

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

  transition: background-color 0.05s ease-out;
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
  containerRef
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
  }, [snapshotNotes, workspaceNotes, col, row, isSnapshot]);

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


  // for 마우스 커서 공유 
  const boxRef = useRef(null);

  const handleMouseOver = (e) => {
    // BeatBox와 BeatGrid의 절대 위치 추출
    const boxRect = boxRef.current.getBoundingClientRect();
    const gridRect = containerRef.current.getBoundingClientRect();

    // BeatGrid 내의 스크롤 위치 고려
    const scrollLeft = containerRef.current.scrollLeft;
    const scrollTop = containerRef.current.scrollTop;

    // BeatBox 내부에서의 상대 좌표 계산
    const mouseX = e.clientX - boxRect.left;
    const mouseY = e.clientY - boxRect.top;

    // 스크롤 위치 + 박스 내부의 위치를 반영한 마우스 좌표 계산    
    const relativeX = (boxRect.left + scrollLeft + mouseX) - gridRect.left;
    const relativeY = (boxRect.top + scrollTop + mouseY) - gridRect.top;    
    
    dispatch(setHoverPosition({ i: col, j: row, x: relativeX, y: relativeY }));
  };

  return (
    <Container
      ref={boxRef}
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
      onMouseOver={handleMouseOver}
    />
  );
};

BeatBox.defaultProps = {
  active: false,
  activeColor: "red",
  onClick: () => null,
};

export default BeatBox;
