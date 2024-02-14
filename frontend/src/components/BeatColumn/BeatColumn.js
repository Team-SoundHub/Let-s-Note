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
    this.state = {
      activeBoxes: [[]],
      activeInstrument: [],
      activeNotes: [],
      playing: false,
      instrumentEnum: {
        piano: 0,
        guitar: 1,
        drum: 2,
      },
    };
  }

  updateActiveNotes() {
    const { scale, drumScale } = this.props;
    const { activeBoxes, instrumentEnum } = this.state;
    const newActiveNotes = [];
    console.log("activeBoxes: ", activeBoxes);
    for (let rowIndex = 0; rowIndex < activeBoxes.length; rowIndex++) {
      const row = activeBoxes[rowIndex];
      if (row) {
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
          const isActive = row[columnIndex];
          console.log("row: ", row);
          const note =
            rowIndex < scale.length
              ? scale[rowIndex]
              : drumScale[rowIndex - scale.length];
          const instrument = Object.keys(instrumentEnum).find(
            (key) => instrumentEnum[key] === columnIndex
          );

          if (isActive) {
            newActiveNotes.push({
              note,
              instrument,
            });
          }
        }
      }
    }
    this.setState({
      activeNotes: newActiveNotes,
    });
    console.log("activeNotes: ", this.state.activeNotes);
  }

  disablePlaying() {
    if (this.state.playing) {
      this.setState({
        playing: !this.state.playing,
      });
    }
  }

  enablePlaying() {
    if (!this.state.playing) {
      this.setState({
        playing: !this.state.playing,
      });
    }
  }

  handleClick = (i) => () => {
    const { onClick, id, synth, scale } = this.props;
    console.log(scale.length);
    console.log(i);
    // 클릭한 box의 정보를 부모 컴포넌트로 전달
    onClick && onClick(id, i);
    if (i < scale.length) {
      this.toggleActive(i)();
    } else {
      this.toggleDrumActive(i)();
    }
  };

  toggleActive = (i) => () => {
    console.log("toggleActive");
    const { scale, synth } = this.props;
    const { instrumentEnum } = this.state;
    this.setState(
      (prev) => {
        const activeBoxes = [...prev.activeBoxes];
        const instrumentIndex = instrumentEnum[synth.activeInstrument];

        if (!activeBoxes[i]) {
          // Initialize activeBoxes[i] as an array of false values with the length of instrumentEnum
          activeBoxes[i] = [];
        }

        activeBoxes[i][instrumentIndex] = !activeBoxes[i][instrumentIndex]; // 활성화 여부 toggle
        console.log(`activeBoxes[${i}]:", ${activeBoxes[i]}`);

        // 연주 코드 추가
        if (synth && activeBoxes[i][instrumentIndex]) {
          synth.playNote(scale[i]);
        }

        this.updateActiveNotes();

        return { activeBoxes };
      },
      () => {
        this.updateActiveNotes();
      }
    );
  };

  toggleDrumActive = (i) => () => {
    console.log("toggleDrumActive");
    const { scale, drumScale, synth } = this.props;
    const { instrumentEnum } = this.state;
    const idx = i - scale.length;
    this.setState(
      (prev) => {
        const activeBoxes = [...prev.activeBoxes];
        const activeInstrument = [...prev.activeInstrument];
        const instrumentIndex = instrumentEnum[synth.activeInstrument];

        if (!activeBoxes[i]) {
          // Initialize activeBoxes[i] as an array of false values with the length of instrumentEnum
          activeBoxes[i] = [];
        }

        activeBoxes[i][instrumentIndex] = !activeBoxes[i][instrumentIndex]; // 활성화 여부 toggle
        console.log(`activeBoxes[${i}]:", ${activeBoxes[i]}`);

        // 연주 코드 추가
        if (synth && activeBoxes[i][instrumentIndex]) {
          console.log(idx);
          synth.playNote(drumScale[idx], synth.time, "8n", "drum");
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
    console.log("activeNotes: ", activeNotes);

    activeNotes.forEach(({ note, instrument }) => {
      synth && synth.playNote(note, time, "8n", instrument);
    });
  };

  resetColumn = () => {
    this.setState({ activeBoxes: [[]], activeNotes: [], activeInstrument: [] });
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
    this.setState((prev) => {
      const newActiveBoxes = [...prev.activeBoxes];
      newActiveBoxes[row] = value;
      return { activeBoxes: newActiveBoxes };
    });
  };

  setActiveInstrument = (row, instrument) => {
    this.setState(
      (prev) => {
        const newActiveInstrument = [...prev.activeInstrument];
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
      isSnapshot,
      containerRef,
    } = this.props;
    const playing = this.state.playing;
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
            synth.activeInstrument === "drum" ? null : this.handleClick(i)
          }
          activeInstrument={synth.activeInstrument}
          visualizeInstrument={visualizeInstrument}
          col={id}
          row={i}
          isSnapshot={isSnapshot}
          containerRef={containerRef}
          playing={playing}
        />
      );
    }
    for (let i = scale.length; i < scale.length + drumScale.length; i++) {
      boxes.push(
        <DrumBox
          inactiveColor={foreground}
          key={i.toString(10)}
          note={drumScale[i - scale.length]}
          active={this.state.activeBoxes[i]}
          setActiveBoxes={this.setActiveBoxes}
          setActiveInstrument={this.setActiveInstrument}
          onClick={this.handleClick(i)}
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
