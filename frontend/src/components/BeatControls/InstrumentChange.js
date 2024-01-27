import React from "react";
import styled from "styled-components";

const Button = styled.button`
  margin: 5px;
  padding: 8px;
  background-color: #3498db;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const InstrumentChange = ({ instrument, changeInstrument }) => (
  <Button onClick={() => changeInstrument(instrument)}>
    {instrument.charAt(0).toUpperCase() + instrument.slice(1)}
  </Button>
);

export default InstrumentChange;
