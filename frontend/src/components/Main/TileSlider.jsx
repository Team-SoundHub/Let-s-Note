import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { WorkspaceTile } from "./Tiles/WorkspaceTile";
import { getMyPageInfo, getMySnapshotInfo } from "../../api/myPageApi";
import { SnapshotTile } from "./Tiles/SnapshotTile";
import { getWorkspaceInfo } from "../../api/workSpaceApi";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(-3rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TilesSliderContainer = styled.div`
  position: relative;
  /* left: 5.2rem; */
  display: flex;
  align-items: center;
  /* max-width: 95vw; */
  max-width: 98vw;
  min-height: 60vh;
  max-height: 60vh;
  padding: 4rem;
  gap: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  cursor: grab;
  user-select: none;
  z-index: 10;
  animation: ${fadeInUp} 1s ease-out forwards;

  &:active {
    cursor: grabbing;
  }

  // 웹킷 기반 브라우저에서 스크롤바 숨기기
  &::-webkit-scrollbar {
    display: none;
  }

  // 파이어폭스에서 스크롤바 숨기기
  scrollbar-width: none;
`;

const TileSlider = ({ accessToken, accountId, isMyWorkspace }) => {
  const navigate = useNavigate();

  // 내 작업실, 내 작품 목록 정보 관련
  const [workspaces, setWorkspaces] = useState([]); // 작업실 목록을 저장하는 상태
  const [snapshots, setSnapshots] = useState([]); // 스냅샷 목록을 저장하는 상태

  useEffect(() => {
    if (isMyWorkspace) {
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
    } else {
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
    }
  }, [accessToken, accountId]);

  // slider 애니메이션 관련
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [dragged, setDragged] = useState(false);

  const startDragging = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setDragged(false);
    setVelocity(0);
  };

  const stopDragging = (e) => {
    setIsDragging(false);
  };

  const onDrag = (e) => {
    if (!isDragging) return;

    console.log("드래그중");
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 0.02; // 드래그 민감도 조정
    // const walk = (x - startX); // 드래그 민감도 조정

    if (Math.abs(walk) > 10) {
      setDragged(true);
    }

    carouselRef.current.scrollLeft -= walk;
    setVelocity(walk);
  };

  useEffect(() => {
    const slide = () => {
      if (Math.abs(velocity) <= 0.1) {
        clearInterval(intervalId);
        return;
      }
      const newScrollLeft = carouselRef.current.scrollLeft - velocity;
      carouselRef.current.scrollLeft = newScrollLeft;
      setVelocity(velocity * 0.92); // 속도 감소
      console.log("미끄러지는 중");
    };

    let intervalId;

    if (!isDragging) {
      intervalId = setInterval(slide, 10);
    }

    return () => clearInterval(intervalId);
  }, [isDragging, velocity]);

  // 작업실, 작품 입장 관련
  const handleNavigateWorkspace = async (spaceId, spaceTitle) => {
    try {
      const response = await getWorkspaceInfo(spaceId);
      if (response === "509") {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching workspace info:", error);
    }
    localStorage.setItem("spaceId", spaceId);
    localStorage.setItem("title", spaceTitle);
    console.log(`[작업실 입장] ${spaceTitle} - spaceId: ${spaceId}`);
    navigate(`/workspace/${spaceId}`); // 동기적 실행 -> 순서 보장
  };

  // 렌더링 관련
  const renderTiles = () => {
    if (isMyWorkspace) {
      return workspaces.map((workspace) => (
        <div
          key={workspace.spaceId}
          className=" flex h-full"
          onClick={(e) => {
            console.log("dragged: ", dragged);
            if (!dragged) {
              handleNavigateWorkspace(workspace.spaceId, workspace.spaceTitle);
            }
            if (dragged) {
              e.stopPropagation();
              return;
            }
            setDragged(false);
          }}
        >
          <WorkspaceTile
            workspaceTitle={workspace.spaceTitle}
            workspaceContent={workspace.spaceContent}
            ownerNickname={workspace.ownerNickname}
            memberNicknames={workspace.memberNicknames}
            updateAt={workspace.updateAt}
            spaceId={workspace.spaceId}
          />
        </div>
      ));
    } else {
      return snapshots.map((snapshot) => (
        <div
          key={snapshot.snapshotId}
          className=" flex h-full"
          onClick={(e) => {
            if (dragged) {
              e.stopPropagation();
              return;
            }
            console.log("스냅샷 클릭");
            navigate(`/snapshot/${snapshot.snapshotId}`, {
              state: { fromMyPage: true },
            });
          }}
        >
          <SnapshotTile
            snapshotTitle={snapshot.snapshotTitle}
            snapshotContent={snapshot.snapshotContent}
            ownerNickname={snapshot.ownerNickname}
            memberNicknames={snapshot.memberNicknames}
            updateAt={snapshot.updateAt}
            snapshotId={snapshot.snapshotId}
          />
        </div>
      ));
    }
  };

  return (
    <>
      <TilesSliderContainer
        ref={carouselRef}
        onMouseDown={startDragging}
        onMouseLeave={stopDragging}
        onMouseUp={stopDragging}
        onMouseMove={onDrag}
      >
        {renderTiles()}
      </TilesSliderContainer>
    </>
  );
};

export default TileSlider;
