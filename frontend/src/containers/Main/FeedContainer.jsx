import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import styled, {keyframes} from 'styled-components';
import { getAllSnapshotInfo } from '../../api/feedApi';
import { FeedTile } from '../../components/Main/Tiles/FeedTile';

const fadeInDown = keyframes`
  from {
    opacity: 0;
    /* transform: translateY(3rem); */
    transform: translateY(25rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardContainer = styled.div`
  position: absolute;  
  left: 50%; 
  right: 50%; 
  transform: translate(-50%, -50%); 
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 1.5rem;
  animation: ${fadeInDown} 2s ease-out forwards;
  justify-content: center; // 그리드 아이템들을 수평 중앙 정렬
  align-items: center; // 그리드 아이템들을 수직 중앙 정렬 (그리드 컨테이너가 충분히 높이가 있을 경우에 적용됨)
  width: auto; 
  max-width: 90vw;
`;


const FeedContainer = ({isLoggedIn}) => {
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
              <FeedTile
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