import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import SnapshotHeader from "../containers/Snapshot/SnapshotHeader";
import WorkSpaceContainer from "../containers/workplace/WorkSpaceContainer";
import SaveSnapshotModal from "../components/WorkSpace/SaveSnapshotModal";
import styled from "styled-components";
import { getSnapshotInfo } from "../api/snapshotApi";
import { setSnapshotNotes, clearAllNotes } from "../app/slices/innerContentSlice";

const Container = styled.div`
  height: 100vh;
`;

const SnapshotPage = () => {  
  const dispatch = useDispatch();

  const { snapshotId } = useParams();
  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);

  // 작업실 입장 시 데이터 요청
  // useEffect(() => {
  //   const fetchSnapshotInfo = async () => {
  //     try {
  //       const response = await getSnapshotInfo(snapshotId);

  //       console.log("스냅샷 정보 response", response);
  //       console.log("스냅샷 정보 - 뭘 넣고 있는거냐:", response.response);

  //       // notesList 전체를 Redux store에 저장
  //       dispatch(setSnapshotNotesList(response.response));

  //       console.log("스냅샷 입장 - snapshotInfo:", response.response);
  //     } catch (error) {
  //       console.error('Error fetching snapshot info:', error);
  //     }
  //   };

  //   fetchSnapshotInfo();
  // }, [snapshotId, dispatch]);

  useEffect(() => {
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
      <SnapshotHeader onOpenModal={handleModalOpen} />
      {isReleaseModalOpen && (
        <SaveSnapshotModal
          onClose={handleModalClose}
          onPublish={handlePublish}
        />
      )}
      <WorkSpaceContainer isSnapshot={true} />
    </Container>
  );
};

export default SnapshotPage;
