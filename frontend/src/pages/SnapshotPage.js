import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import SnapshotHeader from "../containers/Snapshot/SnapshotHeader";
import WorkSpaceContainer from "../containers/workplace/WorkSpaceContainer";
import SaveSnapshotModal from "../components/WorkSpace/SaveSnapshotModal";
import styled from "styled-components";
import { getSnapshotInfo } from "../api/snapshotApi";
import {
  setSnapshotNotes,
  clearAllNotes,
} from "../app/slices/innerContentSlice";

const Container = styled.div`
  height: 100vh;
  background-color: white;
`;

const SnapshotPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { snapshotId } = useParams();
  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);  
  const [isFromMyPage, setIsFromMyPage] = useState(false);
  
  useEffect(() => {
    const fromMyPage = location.state?.fromMyPage;  
    setIsFromMyPage(fromMyPage);
    
    if (fromMyPage){
      console.log(`마이페이지로부터 입장 - fromMyPage: ${fromMyPage}`)
    } else {
      console.log(`피드 입장 | 새로고침 | 스냅샷 생성 후 보러가기 - fromMyPage: ${fromMyPage}`)      
    }

    const fetchSnapshotInfo = async () => {
      try {
        // console.log("스냅샷 요청한 snapshotId", snapshotId);
        const response = await getSnapshotInfo(snapshotId);
        console.log("스냅샷 데이터 요청:", response.response);

        if (response && response.response) {
          dispatch(setSnapshotNotes(response.response));
        }
      } catch (error) {
        console.error("Error fetching snapshot info:", error);
      }
    };

    fetchSnapshotInfo();
  }, [dispatch, snapshotId]);

  const handleModalOpen = () => {
    setIsReleaseModalOpen(true);
  };

  const handleModalClose = () => {
    setIsReleaseModalOpen(false);
  };

  const handlePublish = (title, description) => {
    // console.log("발간하기", title, description);
    // navigate('/mysnapshot');
    setIsReleaseModalOpen(false);
  };

  useEffect(() => {
    return () => {
      dispatch(clearAllNotes());
    };
  }, [dispatch]);

  return (
    <Container>
      <SnapshotHeader onOpenModal={handleModalOpen} fromMyPage={isFromMyPage} />
      {isReleaseModalOpen && (
        <SaveSnapshotModal
          onClose={handleModalClose}
          onPublish={handlePublish}
        />
      )}
      <WorkSpaceContainer isSnapshot={true} spaceId={false} />
    </Container>
  );
};

export default SnapshotPage;
