import React from 'react'
import styled, { keyframes } from 'styled-components';
// import mainImg from '../../assets/landing/mainImage.png'
// import mainImg from '../../assets/landing/mainImage2.jpeg'
import mainImg from '../../assets/landing/mainImage3.png'

const InnerHeader = styled.div`
  display: flex;
  justify-content: center; // 가운데 정렬
  align-items: center; // 세로 방향 가운데 정렬
  width: 100%; // 너비를 부모 컨테이너의 100%로 설정
  height: 100%; // 높이를 부모 컨테이너의 100%로 설정
  position: relative; // 절대 위치 지정된 자식 요소를 위한 상대 위치
`;

const Title = styled.h1`
  font-family: 'Lato', sans-serif; // Lato 폰트 적용
  font-weight: 600;
  letter-spacing: 2px;
  font-size: 48px; // 기본 글자 크기
  color: white; // 글자 색상

  @media (max-width: 768px) {
    font-size: 24px; // 화면 크기가 768px 이하일 때 글자 크기 조정
  }
`;


const Catchphrase = styled.div`
  position: absolute;
  top: 37%; 
  left: 32%;
  transform: translate(-50%, -50%);
  width: auto; // 자동 너비 조정
  font-size: 3rem;
  font-weight: 700;
  z-index: 0;
  text-align: left; // 텍스트 왼쪽 정렬
  line-height: 1.2; // 줄 간격 조정

  @media (min-width: 1500px) {
    top: 37%; 
    left: 30%;
  }  
`;

const Line = styled.span`
  display: block; // 각 줄을 블록 요소로 만들어 줄바꿈 효과 적용
  margin: 1rem;
`;

const ButtonContainer = styled.div`  
  position: absolute;    
  left: 3%;   
  display: flex;
  /* flex-direction: column;    */
  flex-direction: row;   
  gap: 20px;   
  margin-top: 2rem;

  @media (min-width: 1500px) {
    margin-top: 2rem;
  }  
`;

const Button1 = styled.button`
  width: 10rem;
  height: 3rem;
  padding: 10px 20px; 
  font-size: 1.2rem; 
  /* text-align: left; */
  text-align: center;
  font-weight: 400;
  color: #ffffff; 
  background-color: #1665af;
  border: none; 
  border-radius: 15px;
  cursor: pointer; 
  transition: background-color 0.3s;
  z-index: 100;
  
  &:hover {
    background-color: #487e76; 
    cursor: pointer; 
  }
`;

const Button2 = styled.button`
  width: 10rem;
  height: 3rem;
  padding: 10px 20px; 
  font-size: 1.2rem; 
  /* text-align: left; */
  text-align: center;
  font-weight: 400;
  color: #ffffff; 
  background-color: #33ab93;
  border: none; 
  border-radius: 15px;
  cursor: pointer; 
  transition: background-color 0.3s;
  z-index: 100;
  
  &:hover {
    background-color: #487e76; 
    cursor: pointer; 
  }
`;

const MainImage = styled.div`
  position: absolute; // WaveHeader 내에서 자유롭게 위치 조정을 위해 절대 위치 사용
  top: 45%; 
  left: 71%; 
  transform: translate(-50%, -50%); // 정확한 중앙 정렬을 위한 조정
  width: 40%; // 이미지의 너비 설정
  height: 70%; // 이미지의 높이 설정
  background-image: url(${mainImg}); // import한 이미지를 배경 이미지로 사용
  background-size: cover; // 배경 이미지가 컨테이너를 꽉 채우도록 설정
  z-index: 0;

  @media (min-width: 1500px) {
    top: 45%; 
    left: 65%; 
    width: 35%; // 이미지의 너비 설정
    height: 60%; // 이미지의 높이 설정
  }

  @media (min-height: 700px) {
    /* top: 45%; 
    left: 65%;  */
    width: 33%; // 이미지의 너비 설정
    height: 55%; // 이미지의 높이 설정
  }

  @media (max-height: 500px) {
    /* top: 45%; 
    left: 65%;  */
    width: 25%; // 이미지의 너비 설정
    height: 60%; // 이미지의 높이 설정
  }
`;




const AnonLandingContainer = () => {
  return (
    <div>
      <Catchphrase>
        <Line>누구나 연주의 재미를</Line>
        <Line>느낄 수 있도록,</Line>
        <Line>Let's Note!</Line>
        <ButtonContainer>
          <Button1>바로 체험하기</Button1>
          <Button2>작품 둘러보기</Button2>
        </ButtonContainer>
      </Catchphrase>
      <MainImage />
    </div>
  )
}

export default AnonLandingContainer