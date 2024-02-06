import React, { Component } from "react";
import styled from "styled-components";
import BeatBox from "./BeatBox";
import DrumBox from "./DrumBox";
import Subject from "../../observer/Subject";

const Container = styled.div`
  position: relative;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${(props) => props.background};
  margin-left: 0.1rem;
  margin-bottom: 1rem;
  width: 3rem;
`;

class BeatColumn extends Component {
  constructor(props) {
    super(props);
    this.state = { activeBoxes: [], activeInstrument: [], activeNotes: [] };
  }

  updateActiveNotes() {
    const { scale, drumScale } = this.props;
    const { activeBoxes, activeInstrument } = this.state;
    const newActiveNotes = [...scale, ...drumScale]
      .map((note, index) => ({
        note,
        isActive: activeBoxes[index],
        instrument: activeInstrument[index],
      }))
      .filter(({ isActive }) => isActive);

    this.setState({
      activeNotes: newActiveNotes,
    });
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
    console.log("toggleActive");
    const { scale, synth } = this.props;
    this.setState(
      (prev) => {
        const activeBoxes = [...prev.activeBoxes];
        const activeInstrument = [...prev.activeInstrument];

        activeBoxes[i] = !activeBoxes[i]; // 활성화 여부 toggle
        console.log(`activeBoxes[${i}]:", ${activeBoxes[i]}`);
        activeInstrument[i] = synth ? synth.activeInstrument : null; // Ensure synth is defined

        // 연주 코드 추가
        if (synth && activeBoxes[i]) {
          synth.playNote(scale[i]);
        }

        this.updateActiveNotes();

        return { activeBoxes, activeInstrument };
      },
      () => {
        this.updateActiveNotes();
      }
    );
  };

  toggleDrumActive = (i) => () => {
    console.log("toggleDrumActive");
    const { scale, drumScale, synth } = this.props;
    const idx = i - scale.length;
    this.setState(
      (prev) => {
        const activeBoxes = [...prev.activeBoxes];
        const activeInstrument = [...prev.activeInstrument];

        activeBoxes[i] = !activeBoxes[i];
        console.log(`activeBoxes[${i}]:", ${activeBoxes[i]}`);
        activeInstrument[i] = synth ? synth.activeInstrument : null; // Ensure synth is defined

        // 연주 코드 추가
        if (synth && activeBoxes[i]) {
          // console.log(idx);
          synth.playNote(drumScale[idx]);
        }

        return { activeBoxes, activeInstrument };
      },
      () => {
        this.updateActiveNotes();
      }
    );
  };

  playBeat = (time) => {
    const { synth } = this.props;
    const { activeNotes } = this.state;

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

  // componentDidUpdate(prevProps, prevState) {
  //   const { scale, drumScale } = this.props;
  //   const { activeBoxes, activeInstrument } = this.state;

  //   // Check if activeBoxes or activeInstrument has changed
  //   if (
  //     activeBoxes !== prevState.activeBoxes ||
  //     activeInstrument !== prevState.activeInstrument
  //   ) {
  //     // Update activeNotes
  //     const newActiveNotes = [...scale, ...drumScale]
  //       .map((note, index) => ({
  //         note,
  //         isActive: activeBoxes[index],
  //         instrument: activeInstrument[index],
  //       }))
  //       .filter(({ isActive }) => isActive);

  //     this.setState({
  //       activeNotes: newActiveNotes,
  //     });
  //   }
  // }

  componentWillUnmount() {
    Subject.unsubscribe("reset", this.resetColumn);
  }

  setActiveBoxes = (row, value) => {
    console.log("setActiveBoxes");
    this.setState((prev) => {
      const newActiveBoxes = [...prev.activeBoxes];
      newActiveBoxes[row] = value;
      return { activeBoxes: newActiveBoxes };
    });
  };

  setActiveInstrument = (row, instrument) => {
    console.log("setActiveInstrument");
    this.setState(
      (prev) => {
        const newActiveInstrument = [...prev.activeInstrument];
        // console.log(newActiveInstrument);
        newActiveInstrument[row] = instrument;
        return { activeInstrument: newActiveInstrument };
      },
      () => {
        this.updateActiveNotes();
      }
    );
  };

  renderBoxes = () => {
    const {
      scale,
      drumScale,
      foreground,
      synth,
      id,
      visualizeInstrument,
      onHover,
      isSnapshot,
      containerRef,
    } = this.props;
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
          isSnapshot={isSnapshot}
          containerRef={containerRef}
          playing={this.props.playing}
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
          isSnapshot={isSnapshot}
          containerRef={containerRef}
          playing={this.props.playing}
        />
      );
    }
    return boxes;
  };

  render() {
    const { background, id } = this.props;
    return (
      <Container background={background} id={id}>
        {this.renderBoxes()}
      </Container>
    );
  }
}

export default BeatColumn;
