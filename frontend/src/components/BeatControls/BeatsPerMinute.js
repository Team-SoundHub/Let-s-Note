import React, { Component } from "react";
import styled from "styled-components";
import RangeInput from "./RangeInput";

const Container = styled.div`
  margin-left: 8px;
  display: flex;
  min-width: 200px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const Label = styled.span`
  color: white;
  font-size: 16px;
  font-weight: 700;
  width: 100%;
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
  }

  componentWillUnmount() {
    const { current: input } = this.input;
    input.value = this.state.bpm;
    this.removeEventListeners(this.handleChange);
  }

  handleChange = (event) => {
    const { handleChange } = this.props;
    this.setState({ bpm: event.target.value });
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
        <Label>{`Beats / Minute - ${bpm}`}</Label>
        <RangeInput ref={this.input} type="range" min="80" max="200" />
      </Container>
    );
  }
}

BeatsPerMinute.defaultProps = {
  handleChange: () => null,
};

export default BeatsPerMinute;
