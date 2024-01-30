import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import WorkSpaceContainer from "../containers/workplace/WorkSpaceContainer";
import WebSocketContainer from "../containers/WebSocket/WebSocketContainer";
import ChatContainer from "../containers/workplace/ChatContainer";
import WorkSpaceHeader from "../containers/workplace/WorkSpaceHeader";
import ReleaseModal from "../components/WorkSpace/ReleaseModal";
import getWorkspaceInfo from "../api/workSpaceApi";
import { setNotesList } from "../app/slices/innerContentSlice";

const Container = styled.div`
  height: 100vh;
`;

const WorkPlacePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { spaceId } = useParams(); // 현재 spaceId 얻기
  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);
  const [workspaceInfo, setWorkspaceInfo] = useState({ notesList: [], isSnapshotExist: false });

  // 작업실 입장 시 데이터 요청
  useEffect(() => {
    const fetchWorkspaceInfo = async () => {
      try {
        const response = await getWorkspaceInfo(spaceId);                
        setWorkspaceInfo(response.response);
        
        // notesList 전체를 Redux store에 저장
        dispatch(setNotesList(response.response.notesList));
        
        console.log("작업실 입장 - workspaceInfo:", response.response);
      } catch (error) {
        console.error('Error fetching workspace info:', error);
      }
    };
  
    fetchWorkspaceInfo();
  }, [spaceId, dispatch]);

  const handleModalOpen = () => {
    setIsReleaseModalOpen(true);
  };

  const handleModalClose = () => {
    setIsReleaseModalOpen(false);
  };

  const handlePublish = (title, description) => {
    console.log("스냅샷 저장하기", title, description);
    // navigate('/mysnapshot');
    setIsReleaseModalOpen(false);
  };

  return (
    <Container>
      <WebSocketContainer spaceId={spaceId} />
      <WorkSpaceHeader onOpenModal={handleModalOpen} isSnapshotExist={workspaceInfo.isSnapshotExist} />
      {isReleaseModalOpen && (
        <ReleaseModal onClose={handleModalClose} onPublish={handlePublish} />
      )}
      <WorkSpaceContainer notesList={workspaceInfo.notesList} />
      <ChatContainer spaceId={spaceId} />
    </Container>
  );
};

export default WorkPlacePage;
