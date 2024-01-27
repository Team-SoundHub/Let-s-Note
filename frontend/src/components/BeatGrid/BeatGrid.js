import React, { Component } from "react";
import styled from "styled-components";
import BeatColumn from "../BeatColumn/BeatColumn";

const Container = styled.div`
  flex: 1;
  width: calc((100vw - 2px) * 0.8);
  margin: 0;
  display: flex;
  background-color: ${(props) => props.background};
  border: 0.5px solid ${(props) => props.background};
  overflow: auto;
`;

class BeatGrid extends Component {
  state = { count: -1 };

  handleBoxClick = (row, column) => {
    console.log(`Clicked: Row ${row}, Column ${column}`);
  };

  trigger = (time) => {
    this.setState((prev) => ({ count: prev.count + 1 }), this.playBeat(time));
  };

  playBeat = (time) => () => {
    const { columns } = this.props;
    const activeBeat = this.state.count % columns;
    this.refs[activeBeat].playBeat(time);
  };

  activateBox = (x, y) => {
    const { columns } = this.props;
    const rowToActivate = x % columns;
    const beatColumn = this.refs[rowToActivate.toString(10)];
    if (beatColumn) {
      beatColumn.activateBox(y);
    }
  };

  renderBeatColumns = () => {
    const { scale, synth, columns, background, foreground } = this.props;
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
          playing={count % columns === i}
          synth={synth}
          onClick={this.handleBoxClick}
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
