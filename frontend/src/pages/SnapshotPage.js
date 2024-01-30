import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SnapshotHeader from '../containers/Snapshot/SnapshotHeader';
import WorkSpaceContainer from '../containers/workplace/WorkSpaceContainer';
import WebSocketContainer from '../containers/WebSocket/WebSocketContainer';
import ReleaseModal from '../components/WorkSpace/ReleaseModal';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
`;

const SnapshotPage = () => {
    const navigate = useNavigate();
    //   const { spaceId } = useParams(); // 현재 spaceId 얻기
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
        <Container>            
            <SnapshotHeader onOpenModal={handleModalOpen} />
            {isReleaseModalOpen && (
                <ReleaseModal onClose={handleModalClose} onPublish={handlePublish}/>
            )} 
            <WorkSpaceContainer isSnapshot={true}/>
        </Container>
    );
};

export default SnapshotPage;