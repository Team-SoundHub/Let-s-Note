import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import styled, {keyframes} from 'styled-components';
import { getAllSnapshotInfo } from '../../api/feedApi';
import { SnapshotTile } from '../../components/Main/Tiles/SnapshotTile';

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(3rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;



const CardContainer = styled.div`
  position: absolute;
  top: -10rem;
  margin-top: 24rem; 
  margin-left: 9%;
  margin-right: 9%; 
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 1.5rem; 
  animation: ${fadeInDown} 2s ease-out forwards;
`;


const FeedContainer = () => {
  const navigate = useNavigate();

  const [postList, setPostList] = useState([]);
  const [postCardList, setPostCardList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllSnapshotInfo();
        setPostList(response);
      } catch (error) {
        console.error("Get Post List Error: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const renderPostCard = async () => {
      let newPostCardList = [];
      for (let i = 0; i < postList.length; i++) {
        try {
          newPostCardList.push(
            <div
              key={postList[i].snapshotId}
              onClick={() =>
                navigate(`/snapshot/${postList[i].snapshotId}`,
                  { state: { fromMyPage: false } }
                )}
            >
              <SnapshotTile
                snapshotTitle={postList[i].snapshotTitle}
                memberNicknames={postList[i].memberNicknames}
                snapshotContent={postList[i].snapshotContent}
                ownerNickname={postList[i].ownerNickname}                
                updateAt={postList[i].updateAt}
              />
            </div>
          );
        } catch (error) {
          console.error("Get Member Error: ", error);
        }
      }
      setPostCardList(newPostCardList);
    };

    renderPostCard();
  }, [postList, navigate]);

  return (
    <>
      <CardContainer>{postCardList}</CardContainer>
    </>
  )
}

export default FeedContainer