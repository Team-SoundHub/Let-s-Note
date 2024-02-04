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
import NoteModal from "../components/WorkSpace/NoteModal";
import CursorPointer from "../components/WorkSpace/Cursor/CursorPointer";
import Cursors from "../components/WorkSpace/Cursor/Cursors";

import { getWorkspaceInfo, createSnapshot } from "../api/workSpaceApi";
import { setWorkspaceNotes, clearAllNotes } from "../app/slices/innerContentSlice";
import { setMember, getMember } from "../api/workSpaceApi";
import { getMyNickname } from "../api/nicknameApi";


const Container = styled.div`
  height: 100vh;
`;

const WorkPlacePage = () => {
  const dispatch = useDispatch();
  const accountId = sessionStorage.getItem("accountId");
  console.log("workPlacePage에서 accountId 꺼냄 2", accountId);

  const { spaceId } = useParams(); // 현재 spaceId 얻기  

  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);
  const [snapshotCreated, setSnapshotCreated] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isUrlModalOpen, setUrlModalOpen] = useState(false);
  const [snapshotUrl, setSnapshotUrl] = useState("");
  const [snapshotId, setSnapshotId] = useState("");
  const [memberList, setMemberList] = useState([]);
  const [myNickname, setMyNickname] = useState([]);
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

        console.log("작업실 입장 데이터 요청:", response.response.notesList);

        dispatch(setWorkspaceNotes(response.response.notesList));

      } catch (error) {
        console.error("Error fetching workspace info:", error);
      }
    };

    fetchWorkspaceInfo();
  }, [spaceId, dispatch]);

  useEffect(() => {
    const fetchMyNickname = async () => {
      try {
        const response = await getMyNickname(accountId);
        setMyNickname(response.response.nickname);
        console.log("내 닉네임:", response.response.nickname);
      } catch (error) {
        console.error("내 닉네임 요청 Error:", error);
      }
    };

    const fetchMemberList = async () => {
      try {
        const memberResponse = await getMember(spaceId);
        setMemberList(memberResponse.response.membersNickname);
      } catch (error) {
        console.error("Error fetching workspace info:", error);
      }
    };
    fetchMyNickname();
    fetchMemberList();
  }, []);

  useEffect(() => {
    return () => {
      localStorage.removeItem("spaceId");
      dispatch(clearAllNotes());
    };
  }, [spaceId, dispatch]);

  const handleModalOpen = () => {
    setIsReleaseModalOpen(true);
  };

  const handleModalClose = () => {
    setIsReleaseModalOpen(false);
  };

  const handleSave = async (title, description) => {
    // console.log("스냅샷 생성 시도");
    try {
      const response = await createSnapshot(spaceId, title, description);
      // console.log("snapshotId:", response.response.snapshotId);
      setSnapshotUrl(
        `https://www.letsnote.co.kr/snapshot/${response.response.snapshotId}`
      );
      setSnapshotId(`${response.response.snapshotId}`);
      setSnapshotCreated(true);
      setIsReleaseModalOpen(false);
    } catch (error) {
      console.error("스냅샷 저장 오류:", error);
    }
  };

  const closeUrlModal = () => {
    setUrlModalOpen(false);
  };

  const handleCloseSnapshotModal = () => {
    setSnapshotCreated(false);
  };

  /* Add member control */
  const openAddMemberModal = () => {
    setIsAddMemberModalOpen(true);
  };

  const closeAddMemberModal = () => {
    setIsAddMemberModalOpen(false);
  };

  const handleAddMember = async (event) => {
    event.preventDefault();

    const usernameInput = document.getElementById("userId");

    if (usernameInput) {
      const userId = usernameInput.value;

      try {
        const response = await setMember(spaceId, userId);
        const { newMemberName } = response.response;

        setMemberList((prevMemberList) => [...prevMemberList, newMemberName]);
      } catch (error) {
        console.error("Add member error: ", error);
      }
    }
  };


  return (
    <WebSocketContainer spaceId={spaceId}>
      {({ sendCoordinate, sendMessage, sendMousePosition, isConnected }) => (
        <Container>
          <WorkSpaceHeader
            onOpenModal={handleModalOpen}
            isSnapshotExist={workspaceInfo.isSnapshotExist}
            openAddMemberModal={openAddMemberModal}
            handleAddMember={handleAddMember}
            memberList={memberList}
          />
          <WorkSpaceContainer
            isSnapshot={false}
            spaceId={spaceId}
            sendCoordinate={sendCoordinate}
          />
          <ChatContainer
            sendMessage={sendMessage}
            spaceId={spaceId}
            memberList={memberList}
            nickname={myNickname}
          />
          {isReleaseModalOpen && (
            <SaveSnapshotModal
              onClose={handleModalClose}
              onSave={handleSave}
            />
          )}
          {snapshotCreated && (
            <SaveCompleteModal
              onClose={handleCloseSnapshotModal}
              snapshotUrl={snapshotUrl}
              snapshotId={snapshotId}
            />
          )}
          {isAddMemberModalOpen && (
            <AddMemberModal
              closeAddMemberModal={closeAddMemberModal}
              handleAddMember={handleAddMember}
            />
          )}
          {isUrlModalOpen && (
            <NoteModal closeUrlModal={closeUrlModal}
            />
          )}
          <Cursors />
          <CursorPointer
            spaceId={spaceId}
            accountId={accountId}
            sendMousePosition={sendMousePosition}
            isConnected={isConnected} 
          />
        </Container >
      )}
    </WebSocketContainer>
  );
};

export default WorkPlacePage;
