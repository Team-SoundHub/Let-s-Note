import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";
import login from "../api/loginApi";
import Header from "../components/common/Header";
import LoginModal from "../components/auth/LoginModal";
import backgroundImage from "../assets/landing2.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

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
      console.log(response);

      const { accessToken, refreshToken, accountId } = response.response;

      if (accessToken && refreshToken) {
        setUserId(userId);
        setIsLoggedIn(true);
        closeLoginModal();

        localStorage.setItem("access", accessToken);
        localStorage.setItem("refresh", refreshToken);
        localStorage.setItem("nickname", "테스트용입니다.");
        localStorage.setItem("accountId", accountId);
      }
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  return (
    <>
      <Header userId={userId} openLoginModal={openLoginModal} />
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh", // 최소 높이를 뷰포트 높이로 설정
        }}
      >
        {isLoginModalOpen && (
          <LoginModal
            closeLoginModal={closeLoginModal}
            handleLogin={handleLogin}
          />
        )}
      </div>
    </>
  );
};

export default LandingPage;
