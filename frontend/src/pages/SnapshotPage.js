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
  const [maxColumn, setMaxColumn] = useState(0);

  const calculateColumns = (maxColumn) => {
    console.log(`SnapshotPage ----------------`);
    console.log(`[calculateColumns] maxColumn 받았음: ${maxColumn}`);

    const multiple = parseInt(maxColumn / 8);
    const remainder = maxColumn % 8;

    let newColumns;

    newColumns = remainder === 0 ?
      8 * multiple + 4
      : 8 * (multiple + 1) + 4;
    console.log(`[calculateColumns] newColumns: ${newColumns}`);

    return newColumns;
  };

  useEffect(() => {
    const fromMyPage = location.state?.fromMyPage;
    setIsFromMyPage(fromMyPage);

    const fetchSnapshotInfo = async () => {
      try {
        const response = await getSnapshotInfo(snapshotId);
        console.log("스냅샷 데이터 요청:", response.response);
        setMaxColumn(calculateColumns(response.response.maxX));

        if (response && response.response) {
          dispatch(setSnapshotNotes(response.response.notes));
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
      <SnapshotHeader
        onOpenModal={handleModalOpen}
        fromMyPage={isFromMyPage}
      />
      {isReleaseModalOpen && (
        <SaveSnapshotModal
          onClose={handleModalClose}
          onPublish={handlePublish}
        />
      )}
      {maxColumn > 0 && (
        <WorkSpaceContainer
          isSnapshot={true}
          spaceId={false}
          maxColumn={maxColumn}
        />
      )}
    </Container>
  );
};

export default SnapshotPage;
