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
import AddMemberModal from "../components/WorkSpace/AddMemberModal";
import { getWorkspaceInfo, createSnapshot } from "../api/workSpaceApi";
import { setNotesList } from "../app/slices/innerContentSlice";
import { setMember, getMember } from "../api/workSpaceApi";

const Container = styled.div`
  height: 100vh;
`;

const spaceId = localStorage.getItem("spaceId");

const WorkPlacePage = () => {
  const dispatch = useDispatch();

  const { spaceId } = useParams(); // 현재 spaceId 얻기  
  localStorage.setItem("spaceId", spaceId);

  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);
  const [snapshotCreated, setSnapshotCreated] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [snapshotUrl, setSnapshotUrl] = useState("");
  const [memberList, setMemberList] = useState([]);
  const [workspaceInfo, setWorkspaceInfo] = useState({
    notesList: [],
    isSnapshotExist: false,
  });

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
        console.error("Error fetching workspace info:", error);
      }
    };

    fetchWorkspaceInfo();
    
  }, [spaceId, dispatch]);

  useEffect(() => {
    const fetchMemberList = async () => {
      try {
        const memberResponse = await getMember(spaceId);
        setMemberList(memberResponse.response.membersNickname);
        console.log("Initial member list:", memberList);
      } catch (error) {
        console.error("Error fetching workspace info:", error);
      }
    };
    fetchMemberList();
  }, []);

  useEffect(() => {    
    return () => {      
      localStorage.removeItem("spaceId");      
    };
  }, [spaceId]);

  const handleModalOpen = () => {
    setIsReleaseModalOpen(true);
  };

  const handleModalClose = () => {
    setIsReleaseModalOpen(false);
  };

  const handleSave = async (title, description) => {
    try {
      const response = await createSnapshot(spaceId, title, description);
      setSnapshotUrl(
        `https://www.letsnote.co.kr/snapshots/${response.response.snapshotId}`
      );
      setSnapshotCreated(true);
      setIsReleaseModalOpen(false);
    } catch (error) {
      console.error("스냅샷 저장 오류:", error);
    }
  };

  const handleCloseSnapshotModal = () => {
    setSnapshotCreated(false);
  };

  /* Add member control */
  const openAddMemberModal = () => {
    setIsAddMemberModalOpen(true);
    console.log(isAddMemberModalOpen);
  };

  const closeAddMemberModal = () => {
    setIsAddMemberModalOpen(false);
  };

  const handleAddMember = async (event) => {
    event.preventDefault();

    const usernameInput = document.getElementById("userId");

    if (usernameInput) {
      const userId = usernameInput.value;
      console.log("userId: ", userId);

      try {
        const response = await setMember(spaceId, userId);
        console.log("addmember res: ", response);
        const { newMemberName, newMemberImage } = response.response;

        setMemberList((prevMemberList) => [
          ...prevMemberList,
          { name: newMemberName, image: newMemberImage },
        ]);
      } catch (error) {
        console.error("Add member error: ", error);
      }
    }
  };

  return (
    <Container>
      <WebSocketContainer spaceId={spaceId} />
      <WorkSpaceHeader
        onOpenModal={handleModalOpen}
        isSnapshotExist={workspaceInfo.isSnapshotExist}
        openAddMemberModal={openAddMemberModal}
        handleAddMember={handleAddMember}
        memberList={memberList}
      />
      {isReleaseModalOpen && (
        <SaveSnapshotModal onClose={handleModalClose} onSave={handleSave} />
      )}
      {snapshotCreated && (
        <SaveCompleteModal
          onClose={handleCloseSnapshotModal}
          snapshotUrl={snapshotUrl}
        />
      )}
      {isAddMemberModalOpen && (
        <AddMemberModal
          closeAddMemberModal={closeAddMemberModal}
          handleAddMember={handleAddMember}
        />
      )}
      <WorkSpaceContainer notesList={workspaceInfo.notesList} />
      <ChatContainer spaceId={spaceId} />
    </Container>
  );
};

export default WorkPlacePage;
