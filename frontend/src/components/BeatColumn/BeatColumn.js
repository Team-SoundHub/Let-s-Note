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
    this.state = { activeBoxes: [], activeInstrument: [] };
  }

  handleClick = (i) => () => {
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
    const { scale, synth } = this.props;
    this.setState((prev) => {
      const activeBoxes = [...prev.activeBoxes];
      const activeInstrument = [...prev.activeInstrument];

      activeBoxes[i] = !activeBoxes[i];
      activeInstrument[i] = synth ? synth.activeInstrument : null; // Ensure synth is defined

      // 연주 코드 추가
      if (synth && activeBoxes[i]) {
        synth.playNote(scale[i]);
      }

      return { activeBoxes, activeInstrument };
    });
  };

  toggleDrumActive = (i) => () => {
    const { scale, drumScale, synth } = this.props;
    const idx = i - scale.length;
    this.setState((prev) => {
      const activeBoxes = [...prev.activeBoxes];
      const activeInstrument = [...prev.activeInstrument];

      activeBoxes[i] = !activeBoxes[i];
      activeInstrument[i] = synth ? synth.activeInstrument : null; // Ensure synth is defined

      // 연주 코드 추가
      if (synth && activeBoxes[i]) {
        // console.log(idx);
        synth.playNote(drumScale[idx]);
      }

      return { activeBoxes, activeInstrument };
    });
  };

  playBeat = (time) => {
    const { synth, scale, drumScale } = this.props;
    const { activeBoxes, activeInstrument } = this.state;

    const activeNotes = [...scale, ...drumScale]
      .map((note, index) => ({
        note,
        isActive: activeBoxes[index],
        instrument: activeInstrument[index], // Use the provided activeInstrument
      }))
      .filter(({ isActive }) => isActive);

    activeNotes.forEach(({ note, instrument }) => {
      synth && synth.playNote(note, time, "8n", instrument);
    });
  };

  resetColumn = () => {
    this.setState({ activeBoxes: [], activeNotes: [], activeInstrument: [] });
  };

  componentDidMount() {
    Subject.subscribe("reset", this.resetColumn);
  }

  componentWillUnmount() {
    Subject.unsubscribe("reset", this.resetColumn);
  }
  setActiveBoxes = (row, value) => {
    this.setState((prev) => {
      const newActiveBoxes = [...prev.activeBoxes];
      newActiveBoxes[row] = value;
      return { activeBoxes: newActiveBoxes };
    });
  };

  setActiveInstrument = (row, instrument) => {
    this.setState((prev) => {
      const newActiveInstrument = [...prev.activeInstrument];
      // console.log(newActiveInstrument);
      newActiveInstrument[row] = instrument;
      return { activeInstrument: newActiveInstrument };
    });
  };

  renderBoxes = () => {
    const { scale, drumScale, foreground, synth, id, visualizeInstrument } =
      this.props;
    const boxes = [];
    for (let i = 0; i < scale.length; i++) {
      boxes.push(
        <BeatBox
          inactiveColor={foreground}
          key={i.toString(10)}
          note={scale[i]}
          active={this.state.activeBoxes[i]}
          setActiveBoxes={this.setActiveBoxes}
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
