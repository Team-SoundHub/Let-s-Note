import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import BeatColumn from "../BeatColumn/BeatColumn";
import VerticalPiano from "../WorkSpace/Piano";
import BeatChange from "../BeatControls/BeatChange";
import { clearAllNotes } from "../../app/slices/innerContentSlice";
import CursorPointer from "../WorkSpace/Cursor/CursorPointer";
import Cursors from "../WorkSpace/Cursor/Cursors";
import { getWorkspaceContainerInstance } from "../../containers/workplace/WorkSpaceContainer";

const Container = styled.div`
  flex: 1;
  width: 100%;
  height: inherit;
  margin: 0;
  display: flex;
  background-color: ${(props) => props.background};
  border: 0.5px solid ${(props) => props.background};
  overflow-y: auto;
  overflow-x: auto;
  position: relative;
  border-radius: 10px;
`;

const LeftPanel = tw.div`
  flex-1
  flex
  flex-row
  w-[4%]
  sticky
  left-0
  z-10
`;

const RightPanel = tw.div`
  relative
  flex-1
  w-[94%]
  h-inherit
  flex
  flex-row
`;

const BeatChangeContainer = tw.div`
  sticky
  top-0
  bottom-0
  w-full
  h-[30%]
  border
  border-gray-200
  rounded-lg
  shadow
  bg-opacity-30
  border-opacity-30
  ml-1
  translate-y-[120%]
  flex
  flex-row
`;

const ButtonContainer = tw.div`
  flex
  w-10
  items-center
  justify-center  
  bg-white
  bg-opacity-30
  hover:bg-opacity-70
`;

let count = -1;
let prevCount = -1;
let beatGridRef = null;

export const resetCount = () => {
  if (beatGridRef) {
    if (prevCount > -1) {
      beatGridRef.disablePlaying(count);
    }
    beatGridRef.props.setCount(-1);
  }
  count = -1;
};

export const getCount = () => {
  return count;
};

export const handleCountChange = (newCount) => {
  prevCount = count;
  if (beatGridRef) {
    beatGridRef.disablePlaying(prevCount);
    beatGridRef.props.setCount(newCount);
  }
  count = newCount;
};

class BeatGrid extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log("rerender");
    this.cols = [];
    beatGridRef = this;
  }

  handleBoxClick = (column, row) => {
    let instrument = this.props.synth.activeInstrument;
    const { scale } = this.props;
    if (row >= scale.length) instrument = "drum";
    console.log("instrument", instrument);
    this.props.sendCoordinate(instrument, column, row, this.props.spaceId);
    console.log(new Date().getTime());
  };

  playBeat = (time) => {
    const { columns } = this.props;
    const activeBeat = count % columns;
    const prevBeat = prevCount % columns;
    const playColumn = document.getElementById(activeBeat);
    const playColumnRect = playColumn.getBoundingClientRect();
    const container = this.gridRef.current;

    const containerRect = container.getBoundingClientRect();
    const containerCenterX = containerRect.width / 2;

    const playColumnCenterX = playColumnRect.left + playColumnRect.width / 2;
    const scrollValue = playColumnCenterX - containerCenterX;

    container.scrollBy({
      top: 0,
      left: scrollValue,
      behavior: "smooth",
    });

    this.props.setCount(activeBeat);
    console.log(count);
    console.log("activeBeat : ", activeBeat);

    if (this.cols[activeBeat]) {
      if (prevBeat > -1) {
        this.cols[prevBeat].disablePlaying();
      }
      this.cols[activeBeat].enablePlaying();
      this.cols[activeBeat].playBeat(time);
    }
  };

  disablePlaying = (prevCount) => {
    const { columns } = this.props;
    const prevBeat = prevCount % columns;
    if (prevBeat > -1) {
      this.cols[prevBeat].disablePlaying();
    }
  };

  trigger = (time) => {
    handleCountChange(count + 1);
    this.playBeat(time);
  };

  // for 마우스 커서 공유
  gridRef = createRef();

  renderBeatColumns = () => {
    const {
      scale,
      drumScale,
      synth,
      columns,
      background,
      foreground,
      visualizeInstrument,
      changeColumns,
    } = this.props;
    const cols = [];
    for (let i = 0; i < columns; i++) {
      cols.push(
        <BeatColumn
          ref={(BeatColumn) => (this.cols[i] = BeatColumn)}
          background={background}
          foreground={foreground}
          // ref={i.toString(10)}
          key={i.toString(10)}
          id={i}
          scale={scale}
          drumScale={drumScale}
          synth={synth}
          onClick={this.handleBoxClick}
          visualizeInstrument={visualizeInstrument}
          isSnapshot={this.props.isSnapshot}
          containerRef={this.gridRef}
        />
      );
    }
    cols.push(
      !this.props.isSnapshot && (
        <BeatChangeContainer>
          <ButtonContainer
            className="rounded-l-lg border border-r-gray-300"
            onClick={() => changeColumns(-8)}
          >
            <BeatChange mode="subtract" />
          </ButtonContainer>
          <ButtonContainer
            className="rounded-r-lg border border-r-gray-300"
            onClick={() => changeColumns(8)}
          >
            <BeatChange mode="add" />
          </ButtonContainer>
        </BeatChangeContainer>
      )
    );
    return cols;
  };

  renderCursorPointer() {
    const { isSnapshot, sendMousePosition, spaceId, accountId, isConnected } =
      this.props;
    if (!isSnapshot) {
      return (
        <>
          <Cursors />
          <CursorPointer
            sendMousePosition={sendMousePosition}
            spaceId={spaceId}
            accountId={accountId}
            isConnected={isConnected}
            containerRef={this.gridRef}
          />
        </>
      );
    }
  }

  render() {
    const { background } = this.props;
    return (
      <Container ref={this.gridRef} background={background}>
        {this.renderCursorPointer()}
        <LeftPanel>
          <VerticalPiano
            sendLoop={this.props.sendLoop}
            spaceLength={this.props.columns}
          />
        </LeftPanel>
        <RightPanel ref={this.scrollRef}>{this.renderBeatColumns()}</RightPanel>
      </Container>
    );
  }
}

export default BeatGrid;
