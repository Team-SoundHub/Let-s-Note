import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { setHoverPosition } from "../../app/slices/cursorSlice";
import { setClickedNotes } from "../../app/slices/innerContentSlice";

const fillAnimation = keyframes`
  100% {
    width: 250px;
    height: 250px;
    border-radius: 50%;
  }
`;

const Container = styled.div`
  flex: 1;
  margin: 0.05rem;
  background: ${(props) => {
    const activeInstrumentCount = props.active.filter(
      (isActive) => isActive
    ).length;
    if (
      activeInstrumentCount > 0 &&
      props.visualizeInstrument[
        props.instrumentList.indexOf(props.instrument)
      ] === true
    ) {
      if (activeInstrumentCount > 1) {
        const activeColors = props.active.map((isActive, index) =>
          isActive ? pickActiveColor(props.instrumentList[index]) : null
        );
        const filteredColors = activeColors.filter((color) => color !== null);
        return `linear-gradient(30deg, ${filteredColors.join(", ")})`;
      } else {
        return pickActiveColor(
          props.instrumentList[props.active.indexOf(true)]
        );
      }
    } else {
      return props.col % 8 < 4 ? "lightgray" : props.inactiveColor;
    }
  }};
  width: 3rem;
  height: 1.2rem;
  margin-bottom: ${(props) => (props.row % 12 === 11 ? 0.2 : 0)}rem;
  opacity: ${(props) => (props.playing ? 0.7 : 1)};
  transition: background-color 0.05s ease-out, opacity 0.05s ease-out;
`;

/* 애니메이션 추가
  ${(props) =>
    props.playing &&
    `
    animation: ${fillAnimation} 1s ease-in-out infinite alternate;
  `} */

const pickActiveColor = (instrument) => {
  switch (instrument) {
    case "piano":
      return "#FFA1A1 50%";
    case "guitar":
      return "#4886FF 50%";
    case "drum":
      return "rgb(250 204 21)";
    default:
      return "black";
  }
};

const BeatBox = ({
  note,
  onClick,
  inactiveColor,
  activeColor,
  activeInstrument,
  setActiveBoxes,
  visualizeInstrument,
  col,
  row,
  isSnapshot,
  playing,
  containerRef,
}) => {
  const dispatch = useDispatch();

  const [active, setActive] = useState([false, false, false]);
  const [instrument, setInstrument] = useState("piano");
  const instrumentList = ["piano", "guitar", "drum"];

  const innerContent = useSelector((state) => state.innerContent.innerContent);
  const workspaceNotes = useSelector(
    (state) => state.innerContent.workspaceNotes
  );
  const snapshotNotes = useSelector(
    (state) => state.innerContent.snapshotNotes
  );

  // 처음 마운트 시 전역상태의 노트정보 반영
  useEffect(() => {
    let activeNotes;

    if (isSnapshot) {
      activeNotes = snapshotNotes.filter((n) => n.x === col && n.y === row);
    } else {
      activeNotes = workspaceNotes.filter((n) => n.x === col && n.y === row);
    }

    // 해당하는 노트가 있으면 상태 업데이트
    activeNotes.forEach((activeNote) => {
      setActive((prevActive) => {
        const instrumentIndex = instrumentList.indexOf(activeNote.instrument);
        const newActive = [...prevActive];
        newActive[instrumentIndex] = true;
        return newActive;
      });
      setActiveBoxes(row, activeNote.instrument, true);
    });
  }, []);

  const handleClick = () => {
    if (isSnapshot) {
      // isSnapshot이 true일 경우 onClick 이벤트 무시
      return;
    }

    dispatch(setClickedNotes(row));

    onClick && onClick();
  };

  useEffect(() => {
    const instrumentIndex = instrumentList.indexOf(innerContent.instrument);
    // Check if x and y match col and row
    if (
      innerContent.x === col &&
      innerContent.y === row &&
      !active[instrumentIndex]
    ) {
      const newActive = [...active];
      newActive[instrumentIndex] = !newActive[instrumentIndex];
      setActive(newActive);
      setActiveBoxes(row, innerContent.instrument, true);
    } else if (
      innerContent.x === col &&
      innerContent.y === row &&
      active[instrumentIndex]
    ) {
      const newActive = [...active];
      newActive[instrumentIndex] = !newActive[instrumentIndex];
      setActive(newActive);
      setActiveBoxes(row, innerContent.instrument, false);
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
    const relativeX = boxRect.left + scrollLeft + mouseX - gridRect.left;
    const relativeY = boxRect.top + scrollTop + mouseY - gridRect.top;

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

export default BeatBox;
