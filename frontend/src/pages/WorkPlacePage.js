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
import NoteSearchModal from "../containers/Note/NoteSearchModal";
import NoteViewModal from "../containers/Note/NoteViewModal";
import { RiRobot2Line } from "react-icons/ri";
import Swal from "sweetalert2";

import { getWorkspaceInfo, createSnapshot } from "../api/workSpaceApi";
import { setWorkspaceNotes, clearAllNotes } from "../app/slices/innerContentSlice";
import { setMember, getMember } from "../api/workSpaceApi";
import { getMyNickname } from "../api/nicknameApi";

const Container = styled.div`
  position: relative;
  background-color: white;
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
  const [isSearchModalOpen, setisSearchModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [maxColumn, setMaxColumn] = useState(0);

  const handleSearchModalOpen = () => {
    setisSearchModalOpen(true);
  };

  const handleSearchModalClose = () => {
    setisSearchModalOpen(false);
  };

  const calculateColumns = (maxColumn) => {
    console.log(`[calculateColumns] maxColumn 받았음: ${maxColumn}`);
    const multiple = parseInt(maxColumn / 8);
    // const remainder = maxColumn % 8;
    let newColumns;

    if (maxColumn < 96) {
      newColumns = 96;
      console.log(`[calculateColumns] maxColumn < 96: ${newColumns}`);
    } else {
      newColumns = 8 * (multiple + 1);
      console.log(`[calculateColumns] maxColumn > 96 -> newColumns: ${newColumns}`);
    }

    return newColumns;
  };

  // 작업실 입장 시 데이터 요청
  useEffect(() => {
    const fetchWorkspaceInfo = async () => {
      try {
        const response = await getWorkspaceInfo(spaceId);
        setWorkspaceInfo(response.response);
        
        // console.log("작업실 입장 데이터 요청:", response.response.notesList);
        // console.log("작업실 입장 데이터 요청 maxX:", response.response.maxX);
        
        setMaxColumn(calculateColumns(response.response.maxX));        

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
      localStorage.removeItem("title");
      dispatch(clearAllNotes());
    };
  }, [spaceId, dispatch]);

  const handleModalOpen = () => {
    setIsReleaseModalOpen(true);
  };

  const handleModalClose = () => {
    setIsReleaseModalOpen(false);
  };

  const handleSave = (title, description) => {
    // console.log("스냅샷 생성 시도");
    Swal.fire({
      title: "스냅샷을 저장할까요?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const response = await createSnapshot(spaceId, title, description);
          // console.log("snapshotId:", response.response.snapshotId);
          Swal.fire("스냅샷이 저장되었습니다 !", "", "success");
          setSnapshotUrl(
            `https://www.letsnote.co.kr/snapshot/${response.response.snapshotId}`
          );
          setSnapshotId(`${response.response.snapshotId}`);
          setSnapshotCreated(true);
          setIsReleaseModalOpen(false);
        } catch (error) {
          console.error("스냅샷 저장 오류:", error);
        }
      } else if (result.isDenied) {
        Swal.fire("스냅샷 저장이 취소되었습니다.", "", "info");
      }
    });
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
    console.log("isAddMemberModalOpen: ", isAddMemberModalOpen);
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
        const newMemberName = response.response.nickname;

        setMemberList((prevMemberList) => [...prevMemberList, newMemberName]);
      } catch (error) {
        console.error("Add member error: ", error);
      }
    }
  };

  const openImagePreview = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    handleSearchModalClose();
  };

  const closeImagePreview = () => {
    setSelectedImageUrl(null);
  };

  const handleAI = () => {

  };

  return (
    <WebSocketContainer spaceId={spaceId}>
      {({
        sendCoordinate,
        sendMessage,
        sendMousePosition,
        isConnected,
        sendLoop,
      }) => (
        <Container>
          {isReleaseModalOpen && (
            <SaveSnapshotModal onClose={handleModalClose} onSave={handleSave} />
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
          {isSearchModalOpen && (
            <NoteSearchModal
              isSearchModalOpen={isSearchModalOpen}
              handleSearchModalClose={handleSearchModalClose}
              openImagePreview={openImagePreview}
            />
          )}
          {selectedImageUrl && (
            <NoteViewModal
              image_url={selectedImageUrl}
              onClose={closeImagePreview}
            />
          )}
          <WorkSpaceHeader
            onOpenModal={handleModalOpen}
            isSnapshotExist={workspaceInfo.isSnapshotExist}
            openAddMemberModal={openAddMemberModal}
            handleAddMember={handleAddMember}
            memberList={memberList}
          />
          {maxColumn > 0 && (
            <WorkSpaceContainer
              isSnapshot={false}
              spaceId={spaceId}
              accountId={accountId}
              sendCoordinate={sendCoordinate}
              sendLoop={sendLoop}
              openImagePreview={openImagePreview}
              sendMousePosition={sendMousePosition}
              isConnected={isConnected}
              handleSearchModalOpen={handleSearchModalOpen}
              maxColumn={maxColumn}
            />
          )}
          <ChatContainer
            sendMessage={sendMessage}
            spaceId={spaceId}
            memberList={memberList}
            nickname={myNickname}
          />
          <div className={"flex justify-center absolute bottom-[200px] left-0 w-[80px] h-[60px]"}>
            <button className={"flex justify-center items-center w-[60px] h-[60px] rounded-full focus:ring-4 focus:outline-none focus:ring-lime-200 bg-[#49C5B6] hover:bg-[#367e76]"} onClick={handleAI}>
              <RiRobot2Line className={"w-8 h-8 fill-white"}/>
            </button>
          </div>
        </Container>
      )}
    </WebSocketContainer>
  );
};

export default WorkPlacePage;
