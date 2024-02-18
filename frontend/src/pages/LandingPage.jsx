import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled, { css, createGlobalStyle, keyframes } from 'styled-components';
import Swal from "sweetalert2";
// import music_note from '../../assets/images/music_notes.png';

import HeaderAnon from '../components/Main/HeaderAnon'
import HeaderUser from '../components/Main/HeaderUser';
import LandingScroll from '../containers/Main/LandingScroll';
import MainMenuTiles from '../components/Main/MainMenuTiles';
import WavesEffect from '../components/Main/WavesEffect';

import AnonLandingContainer from '../containers/Main/AnonLandingContainer';
import MyWorkspacesContainer from '../containers/Main/MyWorkspacesContainer';
import MySnapshotsContainer from '../containers/Main/MySnapshotsContainer';
import FeedContainer from '../containers/Main/FeedContainer';

import LoginForm from '../components/Main/Modals/LoginForm';
// 임시 import
import AuthModal from '../components/auth/AuthModal';
import CreateSpaceModal from '../components/MyPage/CreateSpaceModal';

import { login, register } from '../api/authApi';
import { getMyNickname } from '../api/nicknameApi';
import { createWorkSpace } from '../api/myPageApi';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato:300,400');
  body, h1, p {
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Lato', sans-serif;
  }
  h1 {
    font-weight: 300;
    letter-spacing: 2px;
    font-size: 48px;
  }
  p {
    letter-spacing: 1px;
    font-size: 14px;
    color: #333333;
  }
`;

const backgroundAnimationMode2 = keyframes`
  0% {
    height: 95vh;
    background: linear-gradient(60deg, #84c4bd 0%, rgba(0,172,193,1) 100%);
  }
  50% {
    height: 20vh;
    background: linear-gradient(60deg, #84c4bd 0%, rgba(0,172,193,1) 100%);
  }
  100% {
    height: 95vh;
    background: linear-gradient(60deg, #77a9d8 0%, #0271d9 100%); 
  }
`;

const backgroundAnimationMode3 = keyframes`
  0% {
    height: 95vh;
    background: linear-gradient(60deg, #84c4bd 0%, rgba(0,172,193,1) 100%);
  }
  50% {
    height: 20vh;
    background: linear-gradient(60deg, #84c4bd 0%, rgba(0,172,193,1) 100%);
  }
  100% {
    height: 95vh;
    background: linear-gradient(60deg, #df9966 0%, #e57321 100%); 
  }
`;

const backgroundAnimationMode4 = keyframes`
  0% {
    height: 95vh;
    background: linear-gradient(60deg, #84c4bd 0%, rgba(0,172,193,1) 100%);
  }
  100% {
    height: 25vh;
    background: linear-gradient(60deg, #e49b96 0%, #ee3c2f 100%);
  }
`;

const LandingMainContainer = styled.div`  
  position: relative;
  text-align: center;     
  background: linear-gradient(60deg, #84c4bd 0%, rgba(0,172,193,1) 100%);
  color: white;  
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;    

  ${({ mode }) => mode === 2 && css`
    animation: ${backgroundAnimationMode2} 1.7s ease-in-out forwards;
  `}

  ${({ mode }) => mode === 3 && css`
    animation: ${backgroundAnimationMode3} 1.7s ease-in-out forwards;
  `}

  ${({ mode }) => mode === 4 && css`
    animation: ${backgroundAnimationMode4} 1.5s forwards;
  `}

  @media (max-width: 768px) {
    height: 90vh;
  }
`;

const InnerHeader = styled.div`
  display: flex;
  justify-content: center; // 가운데 정렬
  align-items: center; // 세로 방향 가운데 정렬
  width: 100%; // 너비를 부모 컨테이너의 100%로 설정
  height: 100%; // 높이를 부모 컨테이너의 100%로 설정
  position: relative; // 절대 위치 지정된 자식 요소를 위한 상대 위치
`;

const Title = styled.h1`
  font-family: 'Lato', sans-serif; // Lato 폰트 적용
  font-weight: 600;
  letter-spacing: 2px;
  font-size: 48px; // 기본 글자 크기
  color: white; // 글자 색상

  @media (max-width: 768px) {
    font-size: 24px; // 화면 크기가 768px 이하일 때 글자 크기 조정
  }
`;


// wave header 뒤에 입힐 이미지 컴포넌트
// const MusicNoteImage = styled.div`
//   position: absolute; // WaveHeader 내에서 자유롭게 위치 조정을 위해 절대 위치 사용
//   top: 10rem; // 상단에서부터 50% 위치에 배치하여 중앙에 오도록 함
//   left: 70rem; // 좌측에서부터 50% 위치에 배치
//   transform: translate(-50%, -50%); // 정확한 중앙 정렬을 위한 조정
//   width: 900px; // 이미지의 너비 설정
//   height: 900px; // 이미지의 높이 설정
//   background-image: url(${music_note}); // import한 이미지를 배경 이미지로 사용
//   background-size: cover; // 배경 이미지가 컨테이너를 꽉 채우도록 설정
//   z-index: 0;

// `;


// 타일 부분
const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

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

const MainMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; // 세로 방향 가운데 정렬
  align-items: center; // 가로 방향 가운데 정렬
  height: 100%; // 부모 컨테이너(WaveHeader)의 높이와 동일하게 설정
`;

const MenuContainerTitle = styled.h2`
  color: white;
  font-size: 35px;
  position: absolute; 
  left: 7.2rem; 
  top: 8rem; 
  z-index: 15;
  animation: ${fadeInUp} 2s ease-out forwards;
`;

const ScrollableContent = styled.div`
  background-color: white;
  padding: 20px;
  height: 200vh; // 스크롤 가능한 높이 설정
  width: 100vw;
`;


const LandingPage = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState(0);
  const [showContainers, setShowContainers] = useState(false);

  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // 모달 관리
  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };

  const openCreateModal = () => {
    console.log("openCreateModal");
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };


  // API 호출 관리
  const handleRegister = async () => {
    const usernameInput = document.getElementById("userId");
    const nicknameInput = document.getElementById("nickname");
    const passwordInput = document.getElementById("password");

    try {
      const userId = usernameInput.value;
      const nickname = nicknameInput.value;
      const password = passwordInput.value;

      const response = await register(userId, nickname, password);

      console.log("reigster response: ", response);

      const { tokenWeight, authoritySet } = response.response;

      if (tokenWeight && authoritySet) {
        if ("Notification" in window) {
          // 사용자에게 알림 권한 요청
          if (Notification.permission !== "granted") {
            await Notification.requestPermission();
          }

          // 권한이 허용된 경우 알림 생성
          if (Notification.permission === "granted") {
            new Notification("회원가입 완료", {
              body: "회원가입이 성공적으로 완료되었습니다.",
              icon: "/path/to/icon.png",
            });
            Swal.fire({
              position: "center",
              icon: "success",
              title: "회원가입이 완료되었습니다 !",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
        closeRegisterModal();
      } else return response.response;
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };

  const handleLogin = async () => {
    const usernameInput = document.getElementById("userId");
    const passwordInput = document.getElementById("password");

    try {
      const userId = usernameInput.value;
      const password = passwordInput.value;
      const response = await login(userId, password);

      const { accessToken, refreshToken, accountId } = response.response;

      if (accessToken && refreshToken) {
        setUserId(userId);
        setIsLoggedIn(true);
        closeLoginModal();
        setMode(1);

        sessionStorage.setItem("access", accessToken);
        sessionStorage.setItem("refresh", refreshToken);
        sessionStorage.setItem("accountId", accountId);

        const fetchNickname = async () => {
          try {
            const accountId = sessionStorage.getItem("accountId");
            if (accountId) {
              const response = await getMyNickname(accountId);
              setNickname(response.response.nickname);
            }
          } catch (error) {
            console.error("닉네임 가져오기 오류:", error);
          }
        };

        fetchNickname();

      }
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("access");
    sessionStorage.removeItem("refresh");
    sessionStorage.removeItem("accountId");
    setIsLoggedIn(false);
    setMode(0);
    navigate("/");
  };

  const handleCreateWorkSpace = async (title, description) => {
    const accountId = sessionStorage.getItem("accountId");
    if (accountId) {
      try {
        const response = await createWorkSpace(title, description, [], accountId);
        if (response) {
          console.log("작업실 생성 완료 - response:", response);
          localStorage.setItem("spaceId", response.response.spaceId);
          localStorage.setItem("title", title);
          navigate(`/workspace/${response.response.spaceId}`);
        } else {
          console.log("작업실 생성 실패");
        }
      } catch (error) {
        console.error("작업실 생성 오류:", error);
      }
    } else {
      console.log("accountId가 세션스토리지에 없음");
    }
  };

  // 메뉴 전환 관리
  useEffect(() => {
    // 새로고침하거나, 나갔다 들어왔을 때 로그인 상태였는지 확인
    const accessToken = sessionStorage.getItem("access");
    if (accessToken) {
      setIsLoggedIn(true);
      setMode(1);

      const fetchNickname = async () => {
        try {
          const accountId = sessionStorage.getItem("accountId");
          if (accountId) {
            const response = await getMyNickname(accountId);
            setNickname(response.response.nickname);
            console.log('닉네임: ', response.response.nickname);
          }
        } catch (error) {
          console.error("닉네임 가져오기 오류:", error);
        }
      };

      fetchNickname();
    }
  }, []);

  useEffect(() => {
    if (mode === 2 || mode === 3 || mode === 4) {
      setTimeout(() => {
        setShowContainers(true);
      }, 1500);
    } else {
      setShowContainers(false);
    }
  }, [mode]);

  const backToUserHome = () => { setMode(1); }
  const enterMyWorkspaces = () => { setMode(2); }
  const enterMySnapshots = () => { setMode(3); }
  const enterFeed = () => { setMode(4); }

  // 메뉴별 렌더링 관리
  const renderMainContainer = () => {
    const accessToken = sessionStorage.getItem("access");
    const accountId = sessionStorage.getItem("accountId");

    switch (mode) {
      case 0:
        return <AnonLandingContainer />;
      case 1:
        return (
          <MainMenuContainer>
            <MenuContainerTitle>{nickname}님, 환영합니다!</MenuContainerTitle>
            <MainMenuTiles
              openCreateModal={openCreateModal}
              enterMyWorkspaces={enterMyWorkspaces}
              enterMySnapshots={enterMySnapshots}
              enterFeed={enterFeed}
            />
          </MainMenuContainer>
        );
      case 2:
        return showContainers ?
          <MyWorkspacesContainer
            accessToken={accessToken}
            accountId={accountId}
            isMyWorkspace={true}
          /> : null;
      case 3:
        return showContainers ?
          <MySnapshotsContainer
            accessToken={accessToken}
            accountId={accountId}
            isMyWorkspace={false}
          /> : null;
      case 4:
        return showContainers ?
          <FeedContainer
          /> : null;
      default:
        return showContainers ? <AnonLandingContainer /> : null;
    }
  };

  return (
    <>
      <GlobalStyle />
      {isLoginModalOpen && (
        <AuthModal
          type="login"
          closeLoginModal={closeLoginModal}
          handleLogin={handleLogin}
        />
      )}
      {isRegisterModalOpen && (
        <AuthModal
          type="register"
          closeLoginModal={closeRegisterModal}
          handleRegister={handleRegister}
        />
      )}
      {isCreateModalOpen && (
        <CreateSpaceModal
          onClose={closeCreateModal}
          onPublish={(title, description) => {
            handleCreateWorkSpace(title, description)
          }}
        />
      )}

      {isLoggedIn ? (
        <HeaderUser
          handleLogout={handleLogout}
          backToUserHome={backToUserHome}
          mode={mode}
        />
      ) : (
        <HeaderAnon
          openLoginModal={openLoginModal}
          openRegisterModal={openRegisterModal}
        />
      )
      }
      {/* <MusicNoteImage /> */}

      <LandingMainContainer mode={mode}>
        {/* <InnerHeader>
          <Title>Let's Note</Title>
        </InnerHeader> */}

        <MainMenuContainer>
          {renderMainContainer()}
        </MainMenuContainer>
        <WavesEffect />

      </LandingMainContainer>


      {mode === 0 &&
        <ScrollableContent>
          <LandingScroll />
        </ScrollableContent>
      }
      {mode === 4 &&
        <ScrollableContent>
          {/* 여기에 피드 컨테이너 */}
        </ScrollableContent>
      }
    </>
  );
}

export default LandingPage;
