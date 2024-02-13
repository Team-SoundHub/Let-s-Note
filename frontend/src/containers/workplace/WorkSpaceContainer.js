import React, { Component, createRef } from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import BeatGrid, { getCount } from "../../components/BeatGrid/BeatGrid";
import Synth from "../../synth/Synth";
import Loading from "../../components/Loading";
import { availableNotes, availableDrumNotes } from "../../constants/scale";
import BeatControls from "../../components/BeatControls/BeatControls";
import InstrumentVisualize from "../../components/InstrumentControl/InstrumentVisualize";
import * as Tone from "tone";
import CseContainer from "./CseContainer";
import { resetCount } from "../../components/BeatGrid/BeatGrid";

const Container = styled.div`
  margin-top: 1rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  position: relative; // Cursors 위치를 위한 css
`;

const GridContainer = tw.div`
relative
  flex
  flex-row
  items-center
  justify-start
  w-full
  bg-white
  p-4
  h-[84vh]
`;

const LeftPanel = tw.div`
  w-[3%]
  h-[98%]
  flex-shrink-0
  bg-white
  mr-2
  items-center
  justify-center
  
`;

const MiddlePanel = tw.div`
  w-[97%]
  h-[98%]
  flex-shrink-0
`;

// const LoopButton = tw.button`
//   text-black
//   hover:bg-red-800
//   focus:outline-none
//   focus:ring-4
//   focus:ring-red-300
//   font-medium
//   rounded-full
//   text-sm
//   px-2.5
//   py-2.5
//   text-center
//   me-2
//   mb-2
//   dark:hover:bg-red-700
//   dark:focus:ring-red-900
// `;

export const instrumentOptions = ["All", "piano", "guitar", "drum"];

class WorkSpaceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      columns: 100,
      columnsInitialized: false,
      availableNotes,
      availableDrumNotes,
      count: -1,
      synth: null,
      visualizeInstrument: [true, true, true],
      isPlaying: false,
    };
    this.initialBPM = 160;
  }

  // 노트 관련
  componentDidMount() {
    console.log(
      "Received spaceId prop in WorkSpaceContainer:",
      this.props.spaceId
    );
    console.log(
      "Received isSnapshot prop in WorkSpaceContainer:",
      this.props.isSnapshot
    );
    
    this.setState({ columns: this.props.maxColumn });  
    console.log(`[WorkSpaceContainer] column 설정: ${this.props.maxColumn}`);

    // 재생 문제가 didmount로 해결됨 그러나 간혹적으로 재생되지 않는 문제가 새로 발생
    const synth = new Synth(this.samplerLoaded);
    this.setState({ synth });
    resetCount();
  }

  samplerLoaded = () => {
    this.setState({ loading: false });
    this.state.synth.setBPM(this.initialBPM);
    const { BeatGrid } = this.refs;
    this.state.synth.repeat(BeatGrid.trigger, "8n");
  };

  handleIsPlaying = () => {
    this.setState((prevState) => ({
      isPlaying: !prevState.isPlaying,
    }));
  };

  setCount = (newCount) => {
    this.setState({
      count: newCount,
    });
  };

  play = async () => {
    // Tone.js의 AudioContext가 suspended 상태일 경우 활성화 시키기
    if (Tone.context.state !== "running") {
      await Tone.start();
      console.log("Audio context is now running");
    }
    this.state.synth.toggle();
  };

  stop = () => {
    this.setState({ isPlaying: false });
    resetCount()
    this.state.synth.stop();
  };

  next = () => {
    this.state.synth.nextBeat();
  };

  adjustBPM = (event) => {
    this.state.synth.setBPM(event.target.value);
  };

  changeColumns = (diff) => {
    const currentCols = this.state.columns;
    if (currentCols + diff <= 8 || currentCols + diff > 500) return;

    this.setState({ columns: currentCols + diff });
  };

  changeInstrument = (instrument) => {
    this.setState({ currentInstrument: instrument });
    this.state.synth.setInstrument(instrument);
  };

  changeVisualizeInstrument = (instrument) => {
    const { visualizeInstrument } = this.state;

    // Find the index of the clicked instrument
    const instrumentIndex = instrumentOptions.indexOf(instrument);

    if (instrumentIndex !== -1) {
      let newVisualizeInstrument;

      if (instrumentIndex === 0) {
        // Set all bits to 1 for "All" instrument
        newVisualizeInstrument = new Array(visualizeInstrument.length).fill(
          true
        );
      } else {
        // Toggle the value at the found index
        newVisualizeInstrument = [...visualizeInstrument];
        newVisualizeInstrument[instrumentIndex - 1] =
          !newVisualizeInstrument[instrumentIndex - 1];
      }

      // Update the state with the new array
      this.setState({ visualizeInstrument: newVisualizeInstrument });
    }
  };

  setInstrumentScale = (scale) => {
    scale = [
      "D2",
      "D#2",
      "E2",
      "F2",
      "F#2",
      "G2",
      "G#2",
      "A2",
      "A#2",
      "B2",
      "C3",
      "C#3",
      "D3",
      "D#3",
      "E3",
      "F3",
      "F#3",
      "G3",
      "G#3",
      "A3",
      "A#3",
      "B3",
      "C4",
      "C#4",
      "D4",
      "D#4",
      "E4",
      "F4",
      "F#4",
      "G4",
      "G#4",
      "A4",
      "A#4",
      "B4",
    ].reverse();
    this.setState({ availableNotes: scale });
  };

  setDrumScale = (drumScale) => {
    drumScale = ["E2", "D2"];

    // Update the state to set the drum scale
    this.setState({ availableDrumNotes: drumScale });
  };

  componentWillUnmount() {
    this.stop();
  }


  render() {
    const {
      loading,
      columns,
      synth,
      availableNotes,
      availableDrumNotes,
      visualizeInstrument,
      isPlaying,
      count,
    } = this.state;
    const { isConnected, isSnapshot } = this.props;

    if (isSnapshot && loading) {
      return <Loading />;
    } else if ((!isSnapshot && !isConnected) || loading) {
      return <Loading />;
    } else {
      return (
        <Container ref={this.containerRef}>
          <GridContainer>
            <LeftPanel>
              {instrumentOptions.map((instrument, index) => (
                <InstrumentVisualize
                  instrument={instrument}
                  changeVisualizeInstrument={this.changeVisualizeInstrument}
                />
              ))}
            </LeftPanel>
            <MiddlePanel>
              <BeatGrid
                ref="BeatGrid"
                synth={synth}
                scale={availableNotes}
                drumScale={availableDrumNotes}
                columns={columns}
                background="skyblue"
                foreground="#ffffff"
                visualizeInstrument={visualizeInstrument}
                isSnapshot={this.props.isSnapshot}
                spaceId={this.props.spaceId}
                sendCoordinate={this.props.sendCoordinate}
                setCount={this.setCount}
                sendLoop={this.props.sendLoop}
                changeColumns={this.changeColumns}
                sendMousePosition={this.props.sendMousePosition}
                isConnected={this.props.isConnected}
              />
            </MiddlePanel>
          </GridContainer>
          <CseContainer
            handleSearchModalOpen={this.props.handleSearchModalOpen}
          />
          <BeatControls
            onPlay={this.play}
            onStop={this.stop}
            changeColumns={this.changeColumns}
            adjustBPM={this.adjustBPM}
            bpm={this.initialBPM}
            changeInstrument={this.changeInstrument}
            columns={columns}
            count={count}
            handleIsPlaying={this.handleIsPlaying}
            isPlaying={isPlaying}
          />
        </Container>
      );
    }
  }
}

export default WorkSpaceContainer;
