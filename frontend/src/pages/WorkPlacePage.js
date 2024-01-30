import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import WorkSpaceContainer from "../containers/workplace/WorkSpaceContainer";
import WebSocketContainer from "../containers/WebSocket/WebSocketContainer";
import ChatContainer from "../containers/workplace/ChatContainer";
import WorkSpaceHeader from "../containers/workplace/WorkSpaceHeader";
import ReleaseModal from "../components/WorkSpace/ReleaseModal";
import getWorkspaceInfo from "../api/workSpaceApi";

const Container = styled.div`
  height: 100vh;
`;

const WorkPlacePage = () => {
  const navigate = useNavigate();
  const { spaceId } = useParams(); // 현재 spaceId 얻기
  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);

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
      <WorkSpaceHeader onOpenModal={handleModalOpen} />
      {isReleaseModalOpen && (
        <ReleaseModal onClose={handleModalClose} onPublish={handlePublish} />
      )}
      <WorkSpaceContainer />
      <ChatContainer spaceId={spaceId} />
    </Container>
  );
};

export default WorkPlacePage;
