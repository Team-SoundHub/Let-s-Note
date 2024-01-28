import React, { Component } from "react";
import styled from "styled-components";
import BeatBox from "./BeatBox";
import Subject from "../../observer/Subject";

const Container = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  background-color: ${(props) => props.background};
  margin-left: ${(props) => (props.id % 2 === 1 ? 0 : 2)}px;
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
    const { onClick, id } = this.props;
    // 클릭한 box의 정보를 부모 컴포넌트로 전달
    onClick && onClick(id, i);
    this.toggleActive(i)();
  };

  toggleActive = (i) => () => {
    const { scale, synth } = this.props;
    this.setState((prev) => {
      const activeBoxes = [...prev.activeBoxes];
      const activeInstrument = [...prev.activeInstrument];

      activeBoxes[i] = !activeBoxes[i];
      activeInstrument[i] = synth ? synth.activeInstrument : null; // Ensure synth is defined

      const activeNotes = scale.map((note, index) => ({
        note,
        isActive: activeBoxes[index],
        instrument: activeInstrument[index], // Add instrument information
      }));

      // 연주 코드 추가
      if (synth && activeBoxes[i]) {
        synth.playNote(scale[i]);
      }

      return { activeBoxes, activeInstrument, activeNotes };
    });
  };

  playBeat = (time) => {
    const { synth, scale } = this.props;
    const { activeBoxes, activeInstrument } = this.state;

    const activeNotes = scale
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

  renderBoxes = () => {
    const { scale, foreground, synth } = this.props;
    console.log("active instrument: ", synth.activeInstrument);
    const boxes = [];
    for (let i = 0; i < scale.length; i++) {
      boxes.push(
        <BeatBox
          inactiveColor={foreground}
          key={i.toString(10)}
          note={scale[i]}
          active={this.state.activeBoxes[i]}
          onClick={
            synth.activeInstrument === "All" ? null : this.handleClick(i)
          }
          activeInstrument={synth.activeInstrument}
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
