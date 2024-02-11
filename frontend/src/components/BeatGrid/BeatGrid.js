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

export const resetCount = () => {
  count = -1;
};

export const getCount = () => {
  return count;
}

export const handleCountChange = (newCount) => {
  count = newCount;
}


class BeatGrid extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log("rerender");
    this.cols = [];
  }


  handleBoxClick = (row, column) => {
    console.log("clicked spaceId:", this.props.spaceId);
    const instrument = this.props.synth.activeInstrument;
    this.props.sendCoordinate(instrument, row, column, this.props.spaceId);
  };

  playBeat = (time) => {
    const { columns } = this.props;
    const activeBeat = count % columns;
    this.props.setCount(activeBeat);
    console.log(count);
    console.log("activeBeat : ",activeBeat);
    
    if (this.cols[activeBeat]) {
      this.cols[activeBeat].playBeat(time);
    }
  };

  trigger = (time) => {
    count += 1;
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
      count,
      changeColumns,
    } = this.props;
    const cols = [];
    for (let i = 0; i < columns; i++) {
      console.log("i = ",i);
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
          playing={count % columns === i}
          synth={synth}
          onClick={this.handleBoxClick}
          visualizeInstrument={visualizeInstrument}
          isSnapshot={this.props.isSnapshot}
          containerRef={this.gridRef}                    
        />
      );
    }
    cols.push(
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
    );
    return cols;
  };

  render() {
    const { background, sendMousePosition, spaceId, accountId, isConnected, count } = this.props;
    return (
      <Container ref={this.gridRef} background={background}>
        <Cursors />
        <CursorPointer
          sendMousePosition={sendMousePosition}
          spaceId={spaceId}
          accountId={accountId}
          isConnected={isConnected}
          containerRef={this.gridRef}          
        />
        <LeftPanel>
          <VerticalPiano
            sendLoop={this.props.sendLoop}
            spaceLength={this.props.columns}
          />
        </LeftPanel>
        <RightPanel>{this.renderBeatColumns()}</RightPanel>
      </Container>
    );
  }
}

export default BeatGrid;
