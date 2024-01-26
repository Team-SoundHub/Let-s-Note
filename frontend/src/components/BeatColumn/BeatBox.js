import React from "react";
import styled from "styled-components";

const Container = styled.div`
  // note를 담는 즉, 클릭 시 색이 채워지는 컨테이너를 의미

  /*
* flex: 1
  * flex-grow: 유연한 공간을 채우는 데 대한 비율을 나타냄
  * flex-shrink: 축소될 때 요소의 크기를 나타냄
  * flex-basis: 유연한 공간을 채우기 전에 요소가 차지하는 기본 크기를 나타냄
flex: 1;은 flex-grow: 1;, flex-shrink: 1;, flex-basis: 0%;와 동일
*/
  flex: 1; //
  margin: 0.5px;
  background-color: ${(props) =>
    props.active ? props.activeColor : props.inactiveColor};
`;

const pickActiveColor = (note) => {
  let letter = note.split("")[0];
  switch (letter) {
    case "A":
      return "#DFCC2B";
    case "B":
      return "#3BD531";
    case "C":
      return "#2929DF";
    case "D":
      return "#DF9329";
    case "E":
      return "#6CBBD5";
    case "F":
      return "#C82F3C";
    case "G":
      return "#8350DF";
    default:
      return "black";
  }
};

const BeatBox = ({ active, note, onClick, inactiveColor }) => {
  const activeColor = pickActiveColor(note);
  return (
    <Container
      active={active}
      activeColor={activeColor}
      inactiveColor={inactiveColor}
      onClick={onClick}
    />
  );
};

BeatBox.defaultProps = {
  active: false,
  activeColor: "red",
  onClick: () => null,
};

export default BeatBox;
