import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import shareIcon from '../../assets/shareIcon2.png'

// 메시지가 나타나는 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 메시지가 사라지는 애니메이션
const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const Header = styled.div`
  background-color: #f3f3f3;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  width: 100wv;
  height: 5vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto; 
`;

const ShareButton = styled.button`  
  color: black;
  background-color: #49C5B6;
  background-image: url(${shareIcon}); 
  background-size: 70%; 
  background-position: center; // 이미지 위치 조절
  background-repeat: no-repeat; // 이미지 반복 방지
  width: 30px; 
  height: 30px; 
  border: none;
  border-radius: 50%;
  cursor: pointer;  
  font-size: large;

  &:hover {
    transform: scale(1.1);
  }
`;

const Message = styled.div`
  color: grey;
  padding: 5px 10px;
  position: fixed;
  top: 1px;
  left: 10%;
  // transform: translateX(50%);
  border-radius: 4px;
  display: ${({ show }) => (show ? 'block' : 'none')};
  animation: ${({ show }) => show ? fadeIn : fadeOut} 0.5s ease-out;
  animation-fill-mode: forwards; // 애니메이션 종료 후 최종 상태 유지
`;


const SnapshotHeader = ({ onOpenModal }) => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);

  const handleGoBack = () => {
    navigate('/mypage');
  }  

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowMessage(true);
    setDisplayMessage(true);

    setTimeout(() => { // 메시지 애니메이션 시작
      setShowMessage(false);

      setTimeout(() => { // 애니메이션이 완료된 후 display 상태 변경
        setDisplayMessage(false);
      }, 500); // 이 시간은 애니메이션 지속 시간과 동일하게 설정
    }, 2000);
  }


  return (
    <Header>
      <button onClick={handleGoBack}> ⬅️ </button>
      <ButtonContainer>
        <ShareButton onClick={handleShare}></ShareButton>
      </ButtonContainer>
      {displayMessage && <Message show={showMessage}>클립보드에 주소가 복사되었습니다. 친구들에게 공유해보세요! </Message>}
    </Header>
  )
}

export default SnapshotHeader;
