import React from 'react'
import styled, { keyframes } from 'styled-components';
import { MenuTile } from './Tiles/MenuTile';

import piano_img from '../../assets/Main/goWorkplace.png';
import workplace_img from '../../assets/Main/myWorkplace.png';
import snapshot_img from '../../assets/Main/mySnapshot.png';

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

const TileSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px; // 타일 간격 조정
  animation: ${fadeInUp} 2s ease-out forwards;

  & > * {    
    animation-delay: calc(var(--tile-index) * 1s);// 각 타일에 대한 지연 시간 설정
    animation-fill-mode: forwards;
  }
`;

const MainMenuTiles = ({ openCreateModal, enterMyWorkspaces, enterMySnapshots, enterFeed }) => {

  return (
    <TileSection>
      <MenuTile
        onClick={openCreateModal}
        style={{ '--tile-index': '0' }}
        index={0}
        imgSrc={piano_img}
        title={"작업하기"}
        description={"누구나 음악을 연주하고, 나만의 작품을 남길 수 있어요"}
      />
      <MenuTile        
        onClick={enterMyWorkspaces}
        style={{ '--tile-index': '1' }}
        imgSrc={workplace_img}
        title={"내 작업실"}
        description={"이전 작업을 이어서 할 수 있어요"}
      />
      <MenuTile        
        onClick={enterMySnapshots}
        style={{ '--tile-index': '2' }}
        imgSrc={snapshot_img}
        title={"내 작품"}
        description={"내 작품들을 모아서 감상하세요"}
      />
      <MenuTile        
        onClick={enterFeed}
        style={{ '--tile-index': '3' }}
        imgSrc={"https://i.pinimg.com/originals/48/1f/92/481f92a061e83e3cf32c683a1c808f79.jpg"}
        title={"구경하기"}
        description={"다른 사람의 작품을 구경하세요"}
      />
    </TileSection>
  )
}

export default MainMenuTiles