import React, { Component } from "react";
import styled from "styled-components";
import BeatColumn from "../BeatColumn/BeatColumn";

const Container = styled.div`
  // grid 전체를  담는 container
  flex: 1;
  width: calc(100vw - 2px);
  margin: 0;
  display: flex;
  background-color: ${(props) => props.background};
  border: 0.5px solid ${(props) => props.background};
`;

class BeatGrid extends Component {
  state = { count: -1 };

  trigger = (time) => {
    this.setState((prev) => ({ count: prev.count + 1 }), this.playBeat(time));
  };

  playBeat = (time) => () => {
    const { columns } = this.props;
    const activeBeat = this.state.count % columns;
    this.refs[activeBeat].playBeat(time);
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
