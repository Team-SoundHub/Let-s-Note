import React, { Component } from "react";
import styled from "styled-components";
import BeatGrid from "./components/BeatGrid/BeatGrid";
import Synth from "./synth/Synth";
import Loading from "./components/Loading";
import { availableNotes } from "./constants/scale";
import BeatControls from "./components/BeatControls/BeatControls";

const Container = styled.div`
  background-color: #303030;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

class App extends Component {
  constructor(props) {
    super(props);
    const synth = new Synth(this.samplerLoaded);

    this.state = {
      loading: true,
      columns: Math.floor(window.innerWidth / 50),
      availableNotes,
      synth,
    };
    this.initialBPM = 160;
  }

  samplerLoaded = () => {
    this.setState({ loading: false });
    this.state.synth.setBPM(this.initialBPM);
    const { BeatGrid } = this.refs;
    this.state.synth.repeat(BeatGrid.trigger, "8n");
  };

  play = () => {
    this.state.synth.toggle();
  };

  next = () => {
    this.state.synth.nextBeat();
  };

  adjustBPM = (event) => {
    this.state.synth.setBPM(event.target.value);
  };

  changeColumns = (diff) => {
    const currentCols = this.state.columns;
    if (currentCols + diff < 4 || currentCols + diff > 30) return;

    this.setState({ columns: currentCols + diff });
  };

  setScale = (scale) => {
    scale = [
      "C1",
      "D1",
      "E1",
      "F1",
      "G1",
      "A1",
      "B1",
      "C2",
      "D2",
      "E2",
      "F2",
      "G2",
      "A2",
      "B2",
      "C3",
    ].reverse();
    this.setState({ availableNotes: scale });
  };

  render() {
    const { loading, columns, synth, availableNotes } = this.state;

    if (loading) {
      return <Loading />;
    } else {
      return (
        <Container>
          <BeatGrid
            ref="BeatGrid"
            synth={synth}
            scale={availableNotes}
            columns={columns}
            background="#34AEA5"
            foreground="#ffffff"
          />
          <BeatControls
            onPlay={this.play}
            changeColumns={this.changeColumns}
            adjustBPM={this.adjustBPM}
            bpm={this.initialBPM}
          />
        </Container>
      );
    }
  }
}

export default App;
