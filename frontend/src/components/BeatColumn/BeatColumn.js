import React, { Component } from "react";
import styled from "styled-components";
import BeatBox from "./BeatBox";
import DrumBox from "./DrumBox";
import Subject from "../../observer/Subject";

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${(props) => props.background};
  margin-left: ${(props) => (props.id === 0 || props.id % 2 === 1 ? 1 : 3)}px;
  margin-bottom: 1px;
  width: 2rem;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: purple;
  pointer-events: none;
  opacity: ${(props) => (props.playing ? 0.3 : 0)};
`;

class BeatColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBoxes: [[]],
      activeInstrument: [],
      instrumentEnum: {
        piano: 0,
        guitar: 1,
        drum: 2,
      },
    };
  }

  handleClick = (i) => () => {
    console.log("handleClick called");
    const { onClick, id, synth } = this.props;
    const instrument = synth.activeInstrument;
    // 클릭한 box의 정보를 부모 컴포넌트로 전달
    onClick && onClick(id, i);
    if (instrument !== "drum") {
      this.toggleActive(i)();
    } else {
      this.toggleDrumActive(i)();
    }
  };

  toggleActive = (i) => () => {
    console.log("toggleActive called");
    const { scale, synth } = this.props;
    const { instrumentEnum } = this.state;

    this.setState((prev) => {
      console.log("setStateCalled");
      const activeBoxes = [...prev.activeBoxes];
      const activeInstrument = [...prev.activeInstrument];

      if (!activeBoxes[i]) {
        // Initialize activeBoxes[i] as an array of false values with the length of instrumentEnum
        activeBoxes[i] = [];
      }

      const instrumentIndex = instrumentEnum[synth.activeInstrument];

      console.log("Before toggle:", activeBoxes[i][instrumentIndex]); // 확인용 출력

      const updatedActiveBoxes = [...activeBoxes];
      updatedActiveBoxes[i][instrumentIndex] =
        !updatedActiveBoxes[i][instrumentIndex];

      console.log("After toggle:", activeBoxes[i][instrumentIndex]); // 확인용 출력

      // 연주 코드 추가
      if (synth && activeBoxes[i][instrumentIndex]) {
        console.log("activeboxes: ", activeBoxes[i]);
        console.log("active instrument: ", synth.activeInstrument);
        synth.playNote(scale[i]);
      }

      return { activeBoxes: updatedActiveBoxes, activeInstrument };
    });
  };

  toggleDrumActive = (i) => () => {
    const { scale, drumScale, synth } = this.props;
    const { instrumentEnum } = this.state;
    const idx = i - scale.length;
    this.setState((prev) => {
      const activeBoxes = [...prev.activeBoxes];
      const activeInstrument = [...prev.activeInstrument];

      if (!activeBoxes[i]) {
        // Initialize activeBoxes[i] as an array of false values with the length of instrumentEnum
        activeBoxes[i] = Array.from(
          { length: Object.keys(instrumentEnum).length },
          () => false
        );
      }

      const instrumentIndex = instrumentEnum[synth.activeInstrument];

      // Check if instrumentIndex is a valid index
      if (
        instrumentIndex !== undefined &&
        instrumentIndex >= 0 &&
        instrumentIndex < activeBoxes[i].length
      ) {
        activeBoxes[i][instrumentIndex] = !activeBoxes[i][instrumentIndex];
        activeInstrument[i] = synth ? synth.activeInstrument : null;
      }

      // 연주 코드 추가
      if (synth && activeBoxes[i][instrumentIndex]) {
        synth.playNote(drumScale[idx]);
      }
    });
  };

  playBeat = (time) => {
    const { synth, scale, drumScale } = this.props;
    const { activeBoxes, instrumentEnum } = this.state;

    const activeNotes = [...scale, ...drumScale]
      .map((note, index) => ({
        note,
        isActive: activeBoxes[index],
      }))
      .filter(({ isActive }) => isActive);

    activeNotes.forEach(({ note, isActive }) => {
      // Check each instrument in the activeBoxes array
      activeBoxes.forEach((instrument, index) => {
        // If the instrument is true, play the note with the corresponding instrument information
        if (instrument) {
          const instrumentName = Object.keys(instrumentEnum)[index];
          synth && synth.playNote(note, time, "8n", instrumentName);
        }
      });
    });
  };

  resetColumn = () => {
    this.setState({ activeBoxes: [[]], activeNotes: [], activeInstrument: [] });
  };

  componentDidMount() {
    Subject.subscribe("reset", this.resetColumn);
  }

  componentWillUnmount() {
    Subject.unsubscribe("reset", this.resetColumn);
  }

  // setActiveBoxes = (row, value) => {
  //   this.setState((prev) => {
  //     const newActiveBoxes = [...prev.activeBoxes];
  //     newActiveBoxes[row] = value;
  //     return { activeBoxes: newActiveBoxes };
  //   });
  // };

  setActiveInstrument = (row, instrument) => {
    this.setState((prev) => {
      const newActiveInstrument = [...prev.activeInstrument];
      newActiveInstrument[row] = instrument;
      return { activeInstrument: newActiveInstrument };
    });
  };

  renderBoxes = () => {
    const { scale, drumScale, foreground, synth, id, visualizeInstrument } =
      this.props;
    const { instrumentEnum } = this.state;
    const boxes = [];
    for (let i = 0; i < scale.length; i++) {
      boxes.push(
        <BeatBox
          inactiveColor={foreground}
          key={i.toString(10)}
          note={scale[i]}
          active={this.state.activeBoxes[i]}
          // setActiveBoxes={this.setActiveBoxes}
          setActiveInstrument={this.setActiveInstrument}
          onClick={
            synth.activeInstrument === "All" ||
            synth.activeInstrument === "drum"
              ? null
              : this.handleClick(i)
          }
          activeInstrument={synth.activeInstrument}
          visualizeInstrument={visualizeInstrument}
          col={id}
          row={i}
          isSnapshot={this.props.isSnapshot}
          instrumentEnum={instrumentEnum}
        />
      );
    }

    for (let i = scale.length; i < scale.length + 2; i++) {
      boxes.push(
        <DrumBox
          inactiveColor={foreground}
          key={i.toString(10)}
          note={drumScale[i - scale.length]}
          active={this.state.activeBoxes[i]}
          setActiveBoxes={this.setActiveBoxes}
          setActiveInstrument={this.setActiveInstrument}
          onClick={
            synth.activeInstrument === "drum" ? this.handleClick(i) : null
          }
          activeInstrument={synth.activeInstrument}
          visualizeInstrument={visualizeInstrument}
          col={id}
          row={i}
          instrumentEnum={instrumentEnum}
        />
      );
    }
    return boxes;
  };

  render() {
    const { playing, background, id } = this.props;
    return (
      <Container background={background} id={id}>
        {this.renderBoxes()}
        <Overlay playing={playing} />
      </Container>
    );
  }
}

export default BeatColumn;
