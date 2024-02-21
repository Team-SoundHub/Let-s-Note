import React, { Component, createRef } from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import BeatGrid from "../../components/BeatGrid/BeatGrid";
import Synth from "../../synth/Synth";
import Loading from "../../components/Loading";
import { availableNotes, availableDrumNotes } from "../../constants/scale";
import BeatControls from "../../components/BeatControls/BeatControls";
import InstrumentVisualize from "../../components/InstrumentControl/InstrumentVisualize";
import * as Tone from "tone";
import CseContainer from "./CseContainer";
import { resetCount } from "../../components/BeatGrid/BeatGrid";
import { RiRobot2Line } from "react-icons/ri";

const Container = styled.div`
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
  h-[80vh]
`;

const LeftPanel = tw.div`
  flex
  w-[3%]
  h-[98%]
  flex-col
  bg-white
  m-4
  items-center
  justify-between
  
`;

const MiddlePanel = tw.div`
  pr-2
  pt-2
  w-[94%]
  h-[98%]
  flex-shrink-0
`;

const FeatureContainer = styled.div`
  height: 6rem;
  min-width: 30%;
  padding-right: 0.5rem;
  background-color: white;
  border-radius: 20px;
  box-shadow: inset 1px 1px 1px rgba(255, 255, 255, 0.4),
    inset -1px -1px 1px rgba(0, 0, 0, 0.04), inset 0 0 0 2px #f0f0f0,
    inset -2px -2px 2px 2px rgba(255, 255, 255, 0.4),
    inset -4px -4px 4px 2px rgba(255, 255, 255, 0.4),
    -1px -1px 4px 0px rgba(255, 255, 255, 0.4),
    -2px -2px 8px 0px rgba(255, 255, 255, 0.4),
    inset 2px 2px 2px 2px rgba(0, 0, 0, 0.04),
    inset 4px 4px 4px 2px rgba(0, 0, 0, 0.04),
    1px 1px 4px 0px rgba(0, 0, 0, 0.04), 2px 2px 8px 0px rgba(0, 0, 0, 0.04);
`;

export const instrumentOptions = ["All", "piano", "guitar", "drum"];

class WorkSpaceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      columns: 96,
      columnsInitialized: false,
      availableNotes,
      availableDrumNotes,
      count: -1,
      synth: null,
      visualizeInstrument: [true, true, true],
      isPlaying: false,
    };
    this.initialBPM = 220;
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
    resetCount();
    this.state.synth.stop();
  };

  next = () => {
    this.state.synth.nextBeat();
  };

  adjustBPM = (event) => {
    this.state.synth.setBPM(event.target.value);
  };

  adjustVolume = (event) => {
    const volume = event.target.value; // 볼륨 값 가져오기
    this.state.synth.setVolume(volume);
  };

  changeColumns = (diff) => {
    const currentCols = this.state.columns;
    if (currentCols + diff <= 8 || currentCols + diff > 500) return;

    this.setState({ columns: currentCols + diff });
  };

  changeInstrument = (instrument) => {
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
      "C2",
      "C#2",
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
    const {
      isConnected,
      isSnapshot,
      spaceId,
      sendCoordinate,
      sendLoop,
      sendMousePosition,
      handleAIInterfaceModalOpen,
    } = this.props;

    if (isSnapshot && loading) {
      return <Loading />;
    } else if ((!isSnapshot && !isConnected) || loading) {
      return <Loading />;
    } else {
      return (
        <Container ref={this.containerRef}>
          <GridContainer>
            <LeftPanel>
              <div>
                {instrumentOptions.map((instrument, index) => (
                  <InstrumentVisualize
                    instrument={instrument}
                    changeVisualizeInstrument={this.changeVisualizeInstrument}
                  />
                ))}
              </div>
              <div className="flex flex-col items-center justify-center mb-4">
                {!isSnapshot && (
                  <>
                    {/* <FeatureContainer> */}
                      <CseContainer
                        handleSearchModalOpen={this.props.handleSearchModalOpen}
                      />
                      <button
                        className={
                          "flex flex-col justify-center bg-[#49c5b6] items-center w-16 h-16 rounded-md my-1 p-1 hover:opacity-70"
                        }
                        onClick={handleAIInterfaceModalOpen}
                      >
                        <RiRobot2Line className={"w-10 h-10 fill-white"} />
                        <div className="text-white font-bold text-sm">
                          AI 추천
                        </div>
                      </button>
                    {/* </FeatureContainer> */}
                  </>
                )}
              </div>
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
                isSnapshot={isSnapshot}
                spaceId={spaceId}
                sendCoordinate={sendCoordinate}
                setCount={this.setCount}
                sendLoop={sendLoop}
                changeColumns={this.changeColumns}
                sendMousePosition={sendMousePosition}
                isConnected={isConnected}
              />
            </MiddlePanel>
          </GridContainer>

          <BeatControls
            onPlay={this.play}
            onStop={this.stop}
            changeColumns={this.changeColumns}
            adjustBPM={this.adjustBPM}
            adjustVolume={this.adjustVolume}
            bpm={this.initialBPM}
            changeInstrument={this.changeInstrument}
            columns={columns}
            count={count}
            handleIsPlaying={this.handleIsPlaying}
            isPlaying={isPlaying}
            isSnapshot={isSnapshot}
          />
        </Container>
      );
    }
  }
}

export default WorkSpaceContainer;
