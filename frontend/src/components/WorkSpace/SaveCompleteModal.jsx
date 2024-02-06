import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import shareIcon from '../../assets/shareIcon2.png';
import ShareButton from '../common/ShareButton';
import Button from '../common/Button';

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

const SaveCompleteModal = ({ onClose, snapshotUrl, snapshotId }) => {
    const navigate = useNavigate();

    const handleGoSnapshot = () => {        
        navigate(`/snapshot/${snapshotId}`);
    }

    return (
        <ModalBackground onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <div className='text-center mb-5'>
                  <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">스냅샷이 저장되었습니다</h2>
                  <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">내 작품을 친구들과 공유하세요!</p>
                </div>
                <div className = "flex justify-center items-center mb-5">
                    <input className="w-full" type="text" value={snapshotUrl} readOnly />
                    <div className= "ml-3 flex items-center">
                      <ShareButton  />
                    </div>
                </div>
                <div className="flex justify-center">
                  <Button onClick={handleGoSnapshot}> 보러가기 </Button>
                </div>
                
            </ModalContent>
        </ModalBackground>
    );
};

export default SaveCompleteModal;