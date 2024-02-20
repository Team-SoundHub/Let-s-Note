import React from 'react';
import styled from 'styled-components';

const TileStyled = styled.div`
  flex: none;
  width: 300px;
  height: 300px;
  margin: 10px;
  background-color: rgba(255, 255, 255, 0.7); 
  /* background-color: rgba(131, 131, 131, 0.3);  */
  display: inline-block;
  background-size: cover;
  position: relative;
  cursor: pointer;  
  transition: all 0.4s ease-out;
  box-shadow: 0px 35px 77px -17px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  color: black;
  border-radius: 45px;
  font-family: 'Roboto';
  

  &:hover {    
    box-shadow: 0px 35px 77px -17px rgba(0, 0, 0, 0.45);
    transform: scale(1.02);    
    /* filter: brightness(0.5) blur(1px); */

    img {
      opacity: 0.2;
    }

    .animate-text {
      opacity: 1;
      transform: translateX(0);      
    }

    span {
      opacity: 1;
      transform: translateY(0px);
    }

  }

`;

const TileImg = styled.img`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  transition: all 0.4s ease-out;
`;

const Text = styled.div`
  position: absolute;
  padding: 30px;
  height: calc(100% - 60px);
  text-align: left; 
`;

const Heading1 = styled.h1`  
  font-weight: 1000;
  margin: 0;
  /* text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3); */
  font-size: 1.5rem;
  color: black;
  text-align: left; 
`;

const Heading2 = styled.h2`
  font-weight: 1000;
  font-size: 1.3rem;
  margin: 20px 0 0 0;  
  /* transform: translateY(3rem); */
  opacity: 1;
  /* transition: all 0.6s ease-in-out; */
`;

const Paragraph = styled.p`
  font-weight: 300;
  margin: 20px 0 0 0;
  line-height: 25px;
  /* transform: translateX(-200px); */
  transition-delay: 0.2s;
  opacity: 1;
  transition: all 0.6s ease-in-out;
`;

// const Dots = styled.div`
//   position: absolute;
//   bottom: -2.5rem;
//   right: 1.5rem;
//   width: 2rem;
//   height: 2rem;
//   color: currentColor;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-around;

//   span {
//     width: 5px;
//     height: 5px;
//     background-color: currentColor;
//     border-radius: 50%;
//     display: block;
//     opacity: 0;
//     transition: transform 0.4s ease-out, opacity 0.5s ease;
//     transform: translateY(30px);

//     &:nth-child(1) {
//       transition-delay: 0.05s;
//     }
//     &:nth-child(2) {
//       transition-delay: 0.1s;
//     }
//     &:nth-child(3) {
//       transition-delay: 0.15s;
//     }
//   }
// `;

const Dots = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  transform: translateY(150%); 
  opacity: 0; 
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;

  ${TileStyled}:hover & {
    transform: translateY(220%); 
    opacity: 1; 
  }

  span {
    width: 5px;
    height: 5px;
    background-color: currentColor;
    border-radius: 50%;
    display: block;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #fff; // 호버 시에 색상 변경
    }
  }
`;


export const CommonTile = ({ onClick, title, description, dateTime }) => {
  return (
    <TileStyled onClick={onClick}>
      {/* <TileImg src={imgSrc} /> */}
      <Text>
        <Heading1>{title}</Heading1>
        <Heading2>{description}</Heading2>
        <Paragraph>Bacon ipsum dolor amet pork belly tri-tip turducken, pancetta bresaola pork chicken meatloaf. Flank sirloin strip steak prosciutto kevin turducken.</Paragraph>
        {/* <Paragraph>{dateTime}</Paragraph> */}
        <Dots>
          ...
        </Dots>
      </Text>
    </TileStyled>
  );
};
