import React, { useState, useEffect, useRef } from "react";
import {useDispatch, useSelector} from "react-redux";

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
import Swal from "sweetalert2";

import {
  getWorkspaceInfo,
  createSnapshot,
  callGenreAI,
  callChordAI,
} from "../api/workSpaceApi";
import {
  setWorkspaceNotes,
  clearAllNotes,
  selectNotes,
  setClickedNotes,
} from "../app/slices/innerContentSlice";
import { setMember, getMember } from "../api/workSpaceApi";
import { getMyNickname } from "../api/nicknameApi";
import { getMyUserId } from "../api/userIdApi";
import AiInterfaceModal from "../components/WorkSpace/AIInterfaceModal";
import AIGenreModal from "../components/WorkSpace/AIGenreModal";
import AIChordModal from "../components/WorkSpace/AIChordModal";

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
  const [loading, setLoading] = useState(false);
  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);
  const [snapshotCreated, setSnapshotCreated] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isUrlModalOpen, setUrlModalOpen] = useState(false);
  const [isAIGenreModalOpen, setIsAIGenreModalOpen] = useState(false);
  const [isAIChordModalOpen, setIsChordAIModalOpen] = useState(false);
  const [isAIInterfaceModalOpen, setIsAIInterfaceModalOpen] = useState(false);
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
  const [myUsername, setMyUsername] = useState(null);
  const audioRef = useRef(null);

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
      console.log(
        `[calculateColumns] maxColumn > 96 -> newColumns: ${newColumns}`
      );
    }

    return newColumns;
  };

  // 작업실 입장 시 데이터 요청
  useEffect(() => {
    const fetchWorkspaceInfo = async () => {
      try {
        const response = await getWorkspaceInfo(spaceId);
        setWorkspaceInfo(response.response);
        
        console.log("작업실 입장 데이터 요청:", response.response.notesList);
        console.log("작업실 입장 데이터 요청 maxX:", response.response.maxX);
        
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

    const fetchMyUsername = async () => {
      try {
        const response = await getMyUserId(accountId);
        setMyUsername(response.response.username);
        console.log("내 id:", response.response.username);
      } catch (error) {
        console.error("내 id 요청 Error:", error);
      }
  };

    fetchMyUsername();
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
      title: "작업한 작품을 저장할까요?",
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: "네, 저장합니다",
      denyButtonText: `아니요`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const response = await createSnapshot(spaceId, title, description);
          // console.log("snapshotId:", response.response.snapshotId);
          Swal.fire("내 작품이 저장되었습니다!", "", "success");
          setSnapshotUrl(
            `https://www.letsnote.co.kr/snapshot/${response.response.snapshotId}`
          );
          setSnapshotId(`${response.response.snapshotId}`);
          setSnapshotCreated(true);
          setIsReleaseModalOpen(false);
        } catch (error) {
          console.error("작품 저장 오류:", error);
        }
      } else if (result.isDenied) {
        Swal.fire("내 작품 저장이 취소되었습니다.", "", "info");
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
        Swal.fire("멤버를 추가했어요");        
      } catch (error) {
        Swal.fire("멤버 추가에 실패했어요. ID를 확인해주세요", "", "info");
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

  const handleAIInterfaceModalOpen = () => {
    setIsAIInterfaceModalOpen(true);
  };

  const handleAIInterfaceModalClose = () => {
    setIsAIInterfaceModalOpen(false);
  };

  const handleAIGenreModalOpen = () => {
    setIsAIGenreModalOpen(true);
  };

  const handleAIGenreModalClose = () => {
    setIsAIGenreModalOpen(false);
  };

  const handleAIChordModalOpen = () => {
    setIsChordAIModalOpen(true);
  };

  const handleAIChordModalClose = () => {
    setIsChordAIModalOpen(false);
  };

  const handleGenreAI = async (accountId, text, value, sendCoordinate) => {
    setLoading(true);
    try {
      const noteInfo = await getWorkspaceInfo(spaceId);
      var piano_data = noteInfo.response.notesList[0].notes;

      const piano_list = Array.from(
        { length: noteInfo.response.maxX + 1 },
        () => []
      );

      for (let i = 0; i < piano_data.length; i++) {
        console.log(piano_data[i]["noteX"]);
        console.log(piano_data[i]["noteY"]);
        piano_list[piano_data[i]["noteX"]].push(String(piano_data[i]["noteY"]));
      }
      const result = await callGenreAI(piano_list, accountId, text, value);

      const formed_list = [
        { instrument: "piano", notes: [] },
        { instrument: "guitar", notes: [] },
        { instrument: "drum", notes: [] },
      ];

      result.response.noteList.forEach(function (current_y, idx) {
        if (current_y.length > 0) {
          var current_x = noteInfo.response.maxX + 1 + idx;
          current_y.forEach(function (inner_y){
            formed_list[0].notes.push({noteX: current_x, noteY: parseInt(inner_y)})
            sendCoordinate("piano", current_x, parseInt(inner_y));
          });
        }
      });
      // dispatch(setWorkspaceNotes(formed_list));

    }catch (error) {
      alert("API 호출 중 오류가 발생했습니다 ㅠㅠ");
    } finally {
      setLoading(false);
      handleAIGenreModalClose();
      handleAIInterfaceModalClose();
    }
  };

  const handleChordAI = async (accountId, sendCoordinate) => {
    setLoading(true);

    try {
      const noteInfo = await getWorkspaceInfo(spaceId);
      var piano_data = noteInfo.response.notesList[0].notes;

      const piano_list = Array.from(
        { length: noteInfo.response.maxX + 1 },
        () => []
      );

      for (let i = 0; i < piano_data.length; i++) {
        console.log(piano_data[i]["noteX"]);
        console.log(piano_data[i]["noteY"]);
        piano_list[piano_data[i]["noteX"]].push(String(piano_data[i]["noteY"]));
      }
      const result = await callChordAI(piano_list, accountId);

      const formed_list = [
        { instrument: "piano", notes: [] },
        { instrument: "guitar", notes: [] },
        { instrument: "drum", notes: [] },
      ];

      result.response.noteList.forEach(function (current_y, idx) {
        if (current_y.length > 0) {
          current_y.forEach(function (inner_y){
            sendCoordinate("guitar", idx, parseInt(inner_y));
            // formed_list[1].notes.push({noteX: idx, noteY: parseInt(inner_y)})
          });
        }
      });
    }catch (error) {
      alert("API 호출 중 오류가 발생했습니다 ㅠㅠ");
    } finally {
      setLoading(false);
      handleAIChordModalClose();
      handleAIInterfaceModalClose();
    }
  };

  return (
    <WebSocketContainer spaceId={spaceId}>
      {({
        sendCoordinate,
        sendMessage,
        sendMousePosition,
        isConnected,
        stompClient,
        sendLoop,
      }) => (
        <Container>
          {loading && (
            <div
              role="status"
              className={
                "absolute w-full h-full bg-gray-200 z-[9000] opacity-80"
              }
            >
              <div
                className={
                  "flex flex-col w-full h-full justify-center items-center"
                }
              >
                <svg
                  aria-hidden="true"
                  className="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="font-bold z-[9999]">Loading...</span>
              </div>
            </div>
          )}
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
              client = {stompClient}
              isConnected={isConnected}
              spaceId={spaceId}
              myNickname={myNickname}
              mySocketId={myUsername}
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
              handleAIInterfaceModalOpen={handleAIInterfaceModalOpen}
              maxColumn={maxColumn}
            />
          )}
          <ChatContainer
            sendMessage={sendMessage}
            spaceId={spaceId}
            memberList={memberList}
            nickname={myNickname}
          />
          {isAIInterfaceModalOpen && (
            <AiInterfaceModal
              handleAIInterfaceModalClose={handleAIInterfaceModalClose}
              handleAIGenreModalOpen={handleAIGenreModalOpen}
              handleAIChordModalOpen={handleAIChordModalOpen}
            />
          )}
          {isAIGenreModalOpen && (
              <AIGenreModal
                  handleAIGenreModalClose={handleAIGenreModalClose}
                  accountId={accountId}
                  handleGenreAI={handleGenreAI}
                  sendCoordinate={sendCoordinate}
              />
          )}
          {isAIChordModalOpen && (
              <AIChordModal
                  handleAIChordModalClose={handleAIChordModalClose}
                  accountId={accountId}
                  handleChordAI={handleChordAI}
                  sendCoordinate={sendCoordinate}
              />
          )}
        </Container>
      )}
    </WebSocketContainer>
  );
};

export default WorkPlacePage;
