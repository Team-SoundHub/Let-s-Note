import styled from "styled-components";

const RangeInput = styled.input`
  & {
    height: 10px;
    -webkit-appearance: none;
    border-radius: 10px;
    width: 50%;
  }
  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    animate: 0.2s;
    border-radius: 5px;
    border: 1px solid #49c5b6;
  }
  &::-webkit-slider-thumb {
    background: #49c5b6 !important;
    box-shadow: 1px 1px 0px #000000;
    border: 0px solid #000000;
    height: 20px;
    width: 20px;
    border-radius: 15px;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -5px;
  }
  &:focus::-webkit-slider-runnable-track {
    background: #ffffff;
  }
  &::-moz-range-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #ffffff;
    border-radius: 5px;
    border: 0px solid #000000;
  }
  &::-moz-range-thumb {
    box-shadow: 1px 1px 0px #000000;
    border: 0px solid #000000;
    height: 20px;
    width: 20px;
    border-radius: 15px;
    background: lightslategray;
    cursor: pointer;
  }
  &::-ms-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: #ffffff;
    border: 0px solid #000000;
    border-radius: 10px;
    box-shadow: 0px 0px 0px #000000;
  }
  &::-ms-fill-upper {
    background: #ffffff;
    border: 0px solid #000000;
    border-radius: 10px;
    box-shadow: 0px 0px 0px #000000;
  }
  &::-ms-thumb {
    margin-top: 1px;
    box-shadow: 1px 1px 0px #000000;
    border: 0px solid #000000;
    height: 20px;
    width: 20px;
    border-radius: 15px;
    background: lightslategray;
    cursor: pointer;
  }
  &:focus::-ms-fill-lower {
    background: #ffffff;
  }
  &:focus::-ms-fill-upper {
    background: #ffffff;
  }
`;

export default RangeInput;
