import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import login from "../api/loginApi";
import Header from "../components/common/Header";
import LoginModal from "../components/auth/LoginModal";
import PostCard from "../components/feed/PostCard";
import Button from "../components/common/Button";

import { getAllSnapshotInfo } from "../api/feedApi";
import { getMember } from "../api/workSpaceApi";

import BackgroundImage from "../assets/landing/backgroundImage.jpg";

const CardContainer = tw.div`
  mt-96 mx-[9%] grid grid-cols-4 gap-6
`;

const LandingContainer = tw.div`
  flex-row items-center justify-center z-0
`;
const TransparentImageStyle = tw.div`
flex flex-col w-full items-center justify-center z-0
`;

const ImageContainer = tw.div`
  flex
  flex-col
  w-full
  items-center
  justify-center
`;

const TextBoxDivStyle = tw.div`
  flex
  flex-col
  items-center
  -my-80
  z-10
`;
const ButtonDivStyle = "";

const LandingPage = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [postList, setPostList] = useState([]);
  const [postCardList, setPostCardList] = useState([]);

  /* Login modal control */
  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

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

        sessionStorage.setItem("access", accessToken);
        sessionStorage.setItem("refresh", refreshToken);
        sessionStorage.setItem("accountId", accountId);
      }
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  const handleLogout = () => {
    // Clear session storage on logout
    sessionStorage.removeItem("access");
    sessionStorage.removeItem("refresh");
    // sessionStorage.removeItem("nickname");
    sessionStorage.removeItem("accountId");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllSnapshotInfo();
        setPostList(response);
      } catch (error) {
        console.error("Get Post List Error: ", error);
      }
    };

    const ConfirmLogin = () => {
      if (sessionStorage.getItem("access")) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    fetchData();
    ConfirmLogin();
  }, []);

  useEffect(() => {
    const renderPostCard = async () => {
      let newPostCardList = [];
      for (let i = 0; i < postList.length; i++) {
        try {
          newPostCardList.push(
            <div
              key={postList[i].snapshotId}
              onClick={() => navigate(`/snapshot/${postList[i].snapshotId}`)}
            >
              <PostCard
                snapshotTitle={postList[i].snapshotTitle}
                memberNicknames={postList[i].memberNicknames}
                snapshotContent={postList[i].snapshotContent}
                ownerNickname={postList[i].ownerNickname}
                snapshotId={postList[i].snapshotId}
                updateAt={postList[i].updateAt}
              ></PostCard>
            </div>
          );
        } catch (error) {
          console.error("Get Member Error: ", error);
        }
      }
      setPostCardList(newPostCardList);
    };

    renderPostCard();
  }, [postList, navigate]);

  return (
    <>
      <Header
        userId={userId}
        isLoggedIn={isLoggedIn}
        openLoginModal={openLoginModal}
        handleLogout={handleLogout}
      />
      <LandingContainer>
        <TransparentImageStyle>
          <ImageContainer>
            <img
              className="w-[80%] h-96 opacity-30"
              src={BackgroundImage}
              alt="Banner"
            />
            <TextBoxDivStyle>
              <div>
                <p className="font-bold text-4xl mb-10">Let's Note Symphony</p>
                <p>
                  Unleashing Collective Creativity: A Global Platform for
                  Connecting Diverse Individuals,
                  <br />
                  Harmonizing Talents, and Crafting an Inspirational Symphony of
                  Innovation and Artistry
                </p>
              </div>
              <div>
                <Button className="mt-20" onClick={setLoginModalOpen}>
                  Sign up for free
                </Button>
              </div>
            </TextBoxDivStyle>

            <div className={ButtonDivStyle}></div>
          </ImageContainer>
          <CardContainer>{postCardList}</CardContainer>
        </TransparentImageStyle>

        {isLoginModalOpen && (
          <LoginModal
            closeLoginModal={closeLoginModal}
            handleLogin={handleLogin}
          />
        )}
      </LandingContainer>
    </>
  );
};

export default LandingPage;
