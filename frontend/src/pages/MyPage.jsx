import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import {
  getMyPageInfo,
  createWorkSpace,
  getMySnapshotInfo,
} from "../api/myPageApi";
import styled from "styled-components";
import Header from "../components/common/Header";
import Button from "../components/common/Button";
import WorkSpaceCard from "../components/WorkSpace/WorkSpaceCard";
import CreateSpaceModal from "../components/MyPage/CreateSpaceModal";
import PostCard from "../components/feed/PostCard";

const MypageContainer = tw.div`
    flex-row
`;

const TitleContainer = tw.div`
    flex
    justify-between
    items-center
`;

const SectionTitle = tw.h2`
  mt-4
  ml-4
  text-2xl
  font-bold
`;

const WorkSpacesSection = tw.div`
    flex
    overflow-x-auto
    gap-5
    px-2.5
    items-start
`;

const SnapshotsSection = tw.div`
flex
overflow-x-auto
gap-5
px-2.5
items-start
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #ddd;
  margin: 20px 0;
`;


const MyPage = () => {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("access");
  const accountId = sessionStorage.getItem("accountId");  

  const [workspaces, setWorkspaces] = useState([]); // 작업실 목록을 저장하는 상태
  const [snapshots, setSnapshots] = useState([]); // 스냅샷 목록을 저장하는 상태  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const workspaceNotes = useSelector((state) => state.innerContent.workspaceNotes);
  const snapshotNotes = useSelector((state) => state.innerContent.snapshotNotes);

  const handleModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateWorkSpace = async (title, description) => {
    try {
      const response = await createWorkSpace(title, description, [], accountId);
      if (response) {
        navigate(`/workspace/${response.response.spaceId}`);
        console.log("작업실 생성 완료", title, description);
      } else {
        console.log("작업실 생성 실패");
      }
    } catch (error) {
      console.error("작업실 생성 오류:", error);
    }
  };

  const handleNavigateWorkspace = async (spaceId) => {
    localStorage.setItem('spaceId', spaceId);
    console.log("마이페이지 저장:", spaceId);
    navigate(`/workspace/${spaceId}`); // 동기적 실행 -> 순서 보장
  };


  useEffect(() => {
    console.log("workspace 리덕스 정보 청소 - workspaceNotes:", workspaceNotes);
    console.log("snapshot 리덕스 정보 청소 - snapshotNotes:", snapshotNotes);

    const fetchMyPageInfo = async () => {
      try {
        const response = await getMyPageInfo(accountId);
        console.log("[마이페이지] 작업실 인포 응답 받음:", response);
        setWorkspaces(response.response); // API 응답으로 받은 작업실 목록을 상태에 저장
      } catch (error) {
        console.error("작업실 정보 로드 실패:", error);
      }
    };
    fetchMyPageInfo();

    const fetchMySnapshotInfo = async () => {
      try {
        const response = await getMySnapshotInfo(accountId);
        console.log("[마이페이지] 스냅샷 인포 응답 받음:", response);
        setSnapshots(response.response); // API 응답으로 받은 스냅샷 목록을 상태에 저장
      } catch (error) {
        console.error("스냅샷 정보 로드 실패:", error);
      }
    };
    fetchMySnapshotInfo();
  }, [accessToken, accountId]);

  // spaceId를 순회하면서 id, index를 얻을 수 있다는 가정
  return (
    <>
      <Header />
      <MypageContainer>
        <TitleContainer>
          <SectionTitle>내 작업실</SectionTitle>
          <Button className="mr-4 mt-4" onClick={handleModalOpen}>
            새 작업실 만들기
          </Button>
        </TitleContainer>
        {isCreateModalOpen && (
          <CreateSpaceModal
            onClose={handleModalClose}
            onPublish={(title, description) =>
              handleCreateWorkSpace(title, description)
            }
          />
        )}
        <WorkSpacesSection>
          {workspaces.map((workspace) => (
            <div
              key={workspace.spaceId}
              className=" flex h-full"
              onClick={() => handleNavigateWorkspace(workspace.spaceId)}
            // onClick={() => navigate(`/workspace/${workspace.spaceId}`)}
            >
              <PostCard
                snapshotTitle={workspace.spaceTitle}
                snapshotContent={workspace.spaceContent}
                ownerNickname={workspace.ownerNickname}
                memberNicknames={workspace.memberNicknames}
                updateAt={workspace.updateAt}
              />
            </div>
          ))}
        </WorkSpacesSection>

        <Divider />

        <SectionTitle> 내 스냅샷 </SectionTitle>
        <SnapshotsSection>
          {snapshots.map((snapshot) => (
            <div
              key={snapshot.snapshotId}
              onClick={() => navigate(`/snapshot/${snapshot.snapshotId}`)}
            >
              <PostCard
                snapshotTitle={snapshot.snapshotTitle}
                snapshotContent={snapshot.snapshotContent}
                ownerNickname={snapshot.ownerNickname}
                memberNicknames={snapshot.memberNicknames}
                updateAt={snapshot.updateAt}
              />
            </div>
          ))}
        </SnapshotsSection>
      </MypageContainer>
    </>
  );
};

export default MyPage;
