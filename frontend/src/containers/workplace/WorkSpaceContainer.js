import React, { Component } from "react";
import styled from "styled-components";
import BeatGrid from "../../components/BeatGrid/BeatGrid";
import Synth from "../../synth/Synth";
import Loading from "../../components/Loading";
import { availableNotes } from "../../constants/scale";
import BeatControls from "../../components/BeatControls/BeatControls";

const Container = styled.div`
  margin-top: 1rem;
  background-color: #303030;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100vw;
  height: calc(85vh - 1rem);
`;

class WorkSpaceContainer extends Component {
  constructor(props) {
    super(props);

    const drumNotes = [36, 38];

    this.state = {
      loading: true,
      columns: Math.floor(window.innerWidth / 50),
      availableNotes,
      drumNotes,
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

  setInstrumentScale = (scale) => {
    scale = [
      "B4",
      "A4",
      "G4",
      "F4",
      "E4",
      "D4",
      "C4",
      "B3",
      "A3",
      "G3",
      "F3",
      "E3",
      "D3",
      "C3",
      "B2",
      "A2",
      "G2",
      "F2",
      "E2",
      "D2",
    ].reverse();
    this.setState({ availableNotes: scale });
  };

  setDrumScale = () => {
    const drumScale = [36, 38];

    // Update the state to set the drum scale
    this.setState({ drumNotes: drumScale });
  };

  render() {
    const { loading, columns, synth, availableNotes, drumNotes } = this.state;

    if (loading) {
      return <Loading />;
    } else {
      return (
        <Container>
          <BeatGrid
            ref="BeatGrid"
            synth={synth}
            scale={availableNotes}
            drumScale={drumNotes}
            columns={columns}
            background="#34AEA5"
            foreground="#ffffff"
            isSnapshot={this.props.isSnapshot} 
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
