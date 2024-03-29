import React, { Component } from "react";
import styled from "styled-components";
import RangeInput from "./RangeInput";
import { connect } from "react-redux";
import { updateBpm } from "../../app/slices/bpmSlice.js";

const Container = styled.div`
  display: flex;
  width: 250px;
  align-items: center;
  justify-content: flex-end;
`;

const Label = styled.span`
  color: #49c5b6;
  font-size: 15px;
  font-weight: 700;
  width: 90%;
  margin-right: 0.5rem;
`;

class BeatsPerMinute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bpm: this.props.bpm || 160,
    };

    this.input = React.createRef();
  }
  componentDidMount() {
    const { current: input } = this.input;
    input.value = this.state.bpm;
    this.addEventListeners(this.handleChange);
    this.props.updateBpm(this.state.bpm); // 스토어 bpm에도 현재 로컬 bpm으로 설정
  }

  componentWillUnmount() {
    const { current: input } = this.input;
    input.value = this.state.bpm;
    this.removeEventListeners(this.handleChange);
  }

  handleChange = (event) => {
    const { handleChange } = this.props;
    this.setState({ bpm: event.target.value });

    if (!this.props.isSnapshot) {
      this.props.updateBpm(event.target.value);
    }

    handleChange(event);
  };

  addEventListeners(handleChange) {
    const { current: input } = this.input;
    input.addEventListener("input", handleChange);
    input.addEventListener("change", handleChange);
  }

  removeEventListeners(handleChange) {
    const { current: input } = this.input;
    input.removeEventListener("input", handleChange);
    input.removeEventListener("change", handleChange);
  }

  render() {
    const { bpm } = this.state;
    return (
      <Container>
        <Label>{`Beats / Minute (${bpm})`}</Label>
        <RangeInput ref={this.input} type="range" min="80" max="300" />
      </Container>
    );
  }
}

BeatsPerMinute.defaultProps = {
  handleChange: () => null,
};

// export default BeatsPerMinute;

const mapDispatchToProps = {
  updateBpm,
};

export default connect(null, mapDispatchToProps)(BeatsPerMinute);
