import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  background-color: black;
`;

const LabelContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 8px;
  margin: 0.5px;
  background-color: white;
`;

const Label = styled.span`
  vertical-align: center;
  color: black;
  font-weight: bold;
  text-align: center;
`;

const renderLabels = (note, index) => {
  const n = note.split("");
  n.splice(-1, 1);
  return (
    <LabelContainer key={index.toString(10)}>
      <Label>{n.join("")}</Label>
    </LabelContainer>
  );
};

const BeatLabels = ({ scale }) => {
  return <Container>{scale.map(renderLabels)}</Container>;
};

export default BeatLabels;
