import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import shareIcon from '../../assets/shareIcon2.png';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;  
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000; // 높은 z-index 값 설정
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;  
  padding: 20px;
  border-radius: 10px;  
`;

const ShareButton = styled.button`  
  color: black;
  background-color: #49C5B6;
  background-image: url(${shareIcon}); 
  background-size: 70%; 
  background-position: center; // 이미지 위치 조절
  background-repeat: no-repeat; // 이미지 반복 방지
  width: 40px; 
  height: 40px; 
  border: none;
  border-radius: 50%;
  cursor: pointer;  
  font-size: large;

  &:hover {
    transform: scale(1.1);
  }
`;

const SaveCompleteModal = ({ onClose, snapshotUrl, snapshotId }) => {
    const navigate = useNavigate();

    const handleGoSnapshot = () => {        
        navigate(`/snapshot/${snapshotId}`);
    }

    return (
        <ModalBackground onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <h2>스냅샷이 저장되었습니다</h2>
                <p>내 작품을 친구들과 공유하세요!</p>
                <div>
                    <input type="text" value={snapshotUrl} readOnly />
                    <ShareButton onClick={() => navigator.clipboard.writeText(snapshotUrl)}></ShareButton>
                </div>
                <button onClick={handleGoSnapshot}> 보러가기 </button>
            </ModalContent>
        </ModalBackground>
    );
};

export default SaveCompleteModal;