import React, { Component } from "react";
import styled from "styled-components";
import BeatGrid from "../../components/BeatGrid/BeatGrid";
import Synth from "../../synth/Synth";
import Loading from "../../components/Loading";
import { availableNotes } from "../../constants/scale";
import BeatControls from "../../components/BeatControls/BeatControls";

const Container = styled.div`
  background-color: #303030;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100vw;
  height: 90vh;
`;

class WorkSpaceContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      columns: Math.floor(window.innerWidth / 50),
      availableNotes,
      synth: null,
    };
    this.initialBPM = 160;
  }

  componentDidMount() {
    // 재생 문제가 didmount로 해결됨 그러나 간혹적으로 재생되지 않는 문제가 새로 발생
    const synth = new Synth(this.samplerLoaded);
    this.setState({ synth });
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

  changeInstrument = (instrument) => {
    this.setState({ currentInstrument: instrument });
    this.state.synth.setInstrument(instrument);
  };

  setScale = (scale) => {
    scale = [
      "D2",
      "E2",
      "F2",
      "G2",
      "A2",
      "B2",
      "C3",
      "D3",
      "E3",
      "F3",
      "G3",
      "A3",
      "B3",
      "C4",
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
            changeInstrument={this.changeInstrument}
          />
        </Container>
      );
    }
  }
}

export default WorkSpaceContainer;
