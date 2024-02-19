import React from 'react';
import styled from 'styled-components';


const TileStyled = styled.div`
  width: 230px;
  height: 300px;
  margin: 10px;
  background-color: #99aeff;
  display: inline-block;
  background-size: cover;
  position: relative;
  cursor: pointer;  
  transition: all 0.4s ease-out;
  box-shadow: 0px 35px 77px -17px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  color: white;
  border-radius: 45px;
  font-family: 'Roboto';
  

  &:hover {    
    box-shadow: 0px 35px 77px -17px rgba(0, 0, 0, 0.64);
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

    &::after {
      content: ''; // 가상 요소에 내용은 없지만, 공간을 차지하도록 함
      position: absolute; 
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8); // 검은색 배경을 50% 불투명도로 적용
      z-index: -1; 
    }
  }

  // 이걸 추가해야 가상요소가 먼저 사라지면서 반짝거리는 현상이 없어짐. 왜지?
  &::after {
      content: ''; // 가상 요소에 내용은 없지만, 공간을 차지하도록 함
      position: absolute; 
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8); // 검은색 배경을 50% 불투명도로 적용
      z-index: -1; 
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
`;

const Heading1 = styled.h1`  
  font-weight: 1000;
  margin: 0;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  font-size: 2.5rem;
`;

const Heading2 = styled.h2`
  font-weight: 1000;
  font-size: 1.3rem;
  margin: 20px 0 0 0;  
  transform: translateY(3rem);
  opacity: 0;
  transition: all 0.6s ease-in-out;
`;

const Paragraph = styled.p`
  font-weight: 300;
  margin: 20px 0 0 0;
  line-height: 25px;
  transform: translateX(-200px);
  transition-delay: 0.2s;
  opacity: 0;
  transition: all 0.6s ease-in-out;
`;

const Dots = styled.div`
  position: absolute;
  bottom: 20px;
  right: 30px;
  width: 30px;
  height: 30px;
  color: currentColor;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  span {
    width: 5px;
    height: 5px;
    background-color: currentColor;
    border-radius: 50%;
    display: block;
    opacity: 0;
    transition: transform 0.4s ease-out, opacity 0.5s ease;
    transform: translateY(30px);

    &:nth-child(1) {
      transition-delay: 0.05s;
    }
    &:nth-child(2) {
      transition-delay: 0.1s;
    }
    &:nth-child(3) {
      transition-delay: 0.15s;
    }
  }
`;

export const MenuTile = ({ onClick, imgSrc, title, description }) => {
  return (
    <TileStyled onClick={onClick}>
      <TileImg src={imgSrc} />
      <Text>
        <Heading1>{title}</Heading1>
        <Heading2 className="animate-text">{description}</Heading2>
        {/* <Paragraph className="animate-text">Bacon ipsum dolor amet pork belly tri-tip turducken, pancetta bresaola pork chicken meatloaf. Flank sirloin strip steak prosciutto kevin turducken.</Paragraph> */}
        <Dots>
          {/* Dots */}
        </Dots>
      </Text>
    </TileStyled>
  );
};
