import React from 'react';
import styled, { keyframes } from 'styled-components';
import TileSlider from '../../components/Main/TileSlider';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(-3rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MenuContainerTitle = styled.h2`
  color: white;
  font-size: 35px;
  position: absolute; 
  left: 7.2rem; 
  top: 8rem; 
  z-index: 15;
  animation: ${fadeInUp} 1s ease-out forwards;
`;

const TilesContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 20px;
  gap: 20px;
  max-height: calc(100vh - 100px);
  margin-top: 20px;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;


const MySnapshotsContainer = ({ accessToken, accountId, isMyWorkspace }) => {
  return (
    <>
      <MenuContainerTitle>내 작품들을 볼 수 있어요</MenuContainerTitle>
      <TilesContainer>
        <TileSlider
          accessToken={accessToken}
          accountId={accountId}
          isMyWorkspace={isMyWorkspace}
        />
      </TilesContainer>
    </>
  )
}

export default MySnapshotsContainer