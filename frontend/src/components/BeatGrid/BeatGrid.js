import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import BeatColumn from "../BeatColumn/BeatColumn";
import VerticalPiano from "../WorkSpace/Piano";
import { sendCoordinate } from "../../containers/WebSocket/WebSocketContainer";
import { clearAllNotes } from "../../app/slices/innerContentSlice";

const Container = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  background-color: ${(props) => props.background};
  border: 0.5px solid ${(props) => props.background};
  overflow-y: auto;
  overflow-x: auto;
  position: relative;
`;

const LeftPanel = tw.div`
  flex
  flex-row
  w-[10%]
  h-full
  sticky
  left-0
  z-10
`;

const RightPanel = tw.div`
  w-[90%]
  h-full
  flex-shrink-0
  flex
  flex-row
`;

class BeatGrid extends Component {
  handleBoxClick = (row, column) => {
    console.log("clicked spaceId:", this.props.spaceId);
    const instrument = this.props.synth.activeInstrument;
    sendCoordinate(instrument, row, column, this.props.spaceId);
  };

  playBeat = (time) => {
    const { columns, count } = this.props;
    const activeBeat = count % columns;
    if (this.refs[activeBeat]) {
      this.refs[activeBeat].playBeat(time);
    }
  };

  trigger = (time) => {
    this.props.addCount();

    this.playBeat(time);
  };

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
    } = this.props;
    const cols = [];
    for (let i = 0; i < columns; i++) {
      cols.push(
        <BeatColumn
          background={background}
          foreground={foreground}
          ref={i.toString(10)}
          key={i.toString(10)}
          id={i}
          scale={scale}
          drumScale={drumScale}
          playing={count % columns === i}
          synth={synth}
          onClick={this.handleBoxClick}
          visualizeInstrument={visualizeInstrument}
          isSnapshot={this.props.isSnapshot}
        />
      );
    }
    return cols;
  };

  render() {
    const { background } = this.props;
    return (
      <Container background={background}>
        <LeftPanel>
          <VerticalPiano />
        </LeftPanel>
        <RightPanel>{this.renderBeatColumns()}</RightPanel>
      </Container>
    );
  }
}

export default BeatGrid;
