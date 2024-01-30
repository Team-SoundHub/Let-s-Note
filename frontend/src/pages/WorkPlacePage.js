import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import WorkSpaceContainer from "../containers/workplace/WorkSpaceContainer";
import WebSocketContainer from "../containers/WebSocket/WebSocketContainer";
import ChatContainer from "../containers/workplace/ChatContainer";
import WorkSpaceHeader from "../containers/workplace/WorkSpaceHeader";
import SaveSnapshotModal from "../components/WorkSpace/SaveSnapshotModal";
import SaveCompleteModal from "../components/WorkSpace/SaveCompleteModal";
import { getWorkspaceInfo, createSnapshot } from "../api/workSpaceApi";
import { setNotesList } from "../app/slices/innerContentSlice";

const Container = styled.div`
  height: 100vh;
`;

const WorkPlacePage = () => {  
  const dispatch = useDispatch();

  const { spaceId } = useParams(); // 현재 spaceId 얻기
  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);
  const [snapshotCreated, setSnapshotCreated] = useState(false);
  const [snapshotUrl, setSnapshotUrl] = useState("");
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

  const handleSave = async (title, description) => {
    try {
      const response = await createSnapshot(spaceId, title, description);
      setSnapshotUrl(`https://우리 도메인/snapshots/${response.response.snapshotId}`);
      setSnapshotCreated(true);
      setIsReleaseModalOpen(false);
    } catch (error) {
      console.error('스냅샷 저장 오류:', error);
    }
  };

  const handleCloseSnapshotModal = () => {
    setSnapshotCreated(false);
  }

  return (
    <Container>
      <WebSocketContainer spaceId={spaceId} />
      <WorkSpaceHeader onOpenModal={handleModalOpen} isSnapshotExist={workspaceInfo.isSnapshotExist} />
      {isReleaseModalOpen && (
        <SaveSnapshotModal onClose={handleModalClose} onSave={handleSave} />
      )}
      {snapshotCreated && (
        <SaveCompleteModal onClose={handleCloseSnapshotModal} snapshotUrl={snapshotUrl} />
      )}      
      <WorkSpaceContainer notesList={workspaceInfo.notesList} />
      <ChatContainer spaceId={spaceId} />
    </Container>
  );
};

export default WorkPlacePage;
