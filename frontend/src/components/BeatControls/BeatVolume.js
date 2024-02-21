import React, { Component } from "react";
import styled from "styled-components";
import RangeInput from "./RangeInput";

const Container = styled.div`
  display: flex;
  width: 12.5rem;
  align-items: center;
  justify-content: flex-end;
`;

const Label = styled.span`
  color: #49c5b6;
  font-size: 15px;
  font-weight: 700;
  width: 55%;
  margin-right: 0.5rem;
`;

class BeatsVolume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: this.props.volume || 50,
    };

    this.input = React.createRef();
  }
  componentDidMount() {
    const { current: input } = this.input;
    input.value = this.state.volume;
    this.addEventListeners(this.handleChange);
  }

  componentWillUnmount() {
    const { current: input } = this.input;
    input.value = this.state.volume;
    this.removeEventListeners(this.handleChange);
  }

  handleChange = (event) => {
    const { handleChange } = this.props;
    this.setState({ volume: event.target.value });
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
    const { volume } = this.state;
    return (
      <Container>
        <Label>{`volume (${volume})`}</Label>
        <RangeInput ref={this.input} type="range" min="0" max="100" />
      </Container>
    );
  }
}

BeatsVolume.defaultProps = {
  handleChange: () => null,
};

export default BeatsVolume;
