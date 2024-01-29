import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WorkSpaceContainer from "../containers/workplace/WorkSpaceContainer";
import WebSocketContainer from "../containers/WebSocket/WebSocketContainer";
import ChatContainer from "../containers/workplace/ChatContainer";
import WorkSpaceHeader from '../containers/workplace/WorkSpaceHeader';
import ReleaseModal from '../components/WorkSpace/ReleaseModal';

const SnapshotPage = () => {
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
    console.log("발간하기", title, description);
    // navigate('/mysnapshot');
    setIsReleaseModalOpen(false);
  };


  return (
    <>      
      <WebSocketContainer spaceId={spaceId} />
      <WorkSpaceHeader onOpenModal={handleModalOpen} />      
      {isReleaseModalOpen && (
        <ReleaseModal
          onClose={handleModalClose}
          onPublish={handlePublish}
        />
      )}
      <WorkSpaceContainer />      
    </>
  );
};

export default SnapshotPage;