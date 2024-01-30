import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
// import { createSnapshot } from '../../api/workspaceApi';

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
  height: 5vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto; 
`;

const SnapshotButton = styled.button`  
  color: black;
  backgorund-color: #f3f3f3;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;  

  &:hover {
    transform: scale(1.1);
  }
`;

const Message = styled.div`
  color: grey;
  padding: 5px 10px;
  position: fixed;
  top: 20px;
  left: 30rem;
  border-radius: 4px;
  display: ${({ show }) => (show ? 'block' : 'none')};
  animation: ${({ show }) => show ? fadeIn : fadeOut} 0.5s ease-out;
  animation-fill-mode: forwards; // 애니메이션 종료 후 최종 상태 유지
`;


const WorkSpaceHeader = ({ onOpenModal, isSnapshotExist }) => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);  

  // 방장인지 여부 체크하고 발매하기 버튼 보이기/ 안보이기 추가
  // 이미 발매했는지 여부 확인하고 발매하기/ 수정하기 추가
  // 방장인지 여부 체크하고 발매하기 버튼 보이기/ 안보이기 추가
  // 이미 발매했는지 여부 확인하고 발매하기/ 수정하기 추가

  // const handleCreateSnapShot = () => {
  //     navigate('/mysnapshot')
  // const handleCreateSnapShot = () => {
  //     navigate('/mysnapshot')

  // }
  // }

  // const handleCreateSnapShot = async() => {
  //     try {
  //         const response = await createSnapshot(spaceId);
  //         console.log(response);
  //     } catch (error) {
  //         console.error('발매하기 오류:', error);
  //     }
  // }

  const handleShare = () => {
    const snapshotUrl = "스냅샷 url 불러오는 로직 필요";
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
      <ButtonContainer>
        <SnapshotButton onClick={onOpenModal}>스냅샷 저장</SnapshotButton>        
      </ButtonContainer>      
    </Header>
  )
}

export default WorkSpaceHeader;
