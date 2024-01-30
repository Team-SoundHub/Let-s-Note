import React, { Component } from "react";
import styled from "styled-components";
import BeatColumn from "../BeatColumn/BeatColumn";
import { sendCoordinate } from "../../containers/WebSocket/WebSocketContainer";

const Container = styled.div`
  flex: 1;
  width: 100vw;
  margin: 0;
  display: flex;
  background-color: ${(props) => props.background};
  border: 0.5px solid ${(props) => props.background};
  overflow-y: auto;
  overflow-x: auto;
`;

class BeatGrid extends Component {
  state = { count: -1 };

  handleBoxClick = (row, column) => {
    console.log(
      `Clicked: Row ${row}, Column ${column}, Instrument ${this.props.synth.activeInstrument}`
    );
    const instrument = this.props.synth.activeInstrument;
    sendCoordinate(instrument, row, column);
  };

  trigger = (time) => {
    this.setState(
      (prev) => ({ count: prev.count + 1 }),
      () => this.playBeat(time)
    );
  };

  playBeat = (time) => {
    const { columns } = this.props;
    const activeBeat = this.state.count % columns;
    this.refs[activeBeat].playBeat(time);
  };

  renderBeatColumns = () => {
    const { scale, drumScale, synth, columns, background, foreground } =
      this.props;
    const { count } = this.state;
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
          isSnapshot={this.props.isSnapshot}
        />
      );
    }
    return cols;
  };

  render() {
    const { background } = this.props;
    return (
      <Container background={background}>{this.renderBeatColumns()}</Container>
    );
  }
}

export default BeatGrid;
