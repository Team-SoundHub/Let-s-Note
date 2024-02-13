import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import shareIcon from "../../assets/shareIcon2.png";
import Swal from "sweetalert2";
import ShareButton from "../../components/common/ShareButton";

// 메시지가 나타나는 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 메시지가 사라지는 애니메이션
const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const Header = styled.div`
  background-color: #f3f3f3;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  height: 7vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
`;

const Message = styled.div`
  color: grey;
  padding: 5px 10px;
  position: fixed;
  top: 1px;
  left: 10%;
  // transform: translateX(50%);
  border-radius: 4px;
  display: ${({ show }) => (show ? "block" : "none")};
  animation: ${({ show }) => (show ? fadeIn : fadeOut)} 0.5s ease-out;
  animation-fill-mode: forwards; // 애니메이션 종료 후 최종 상태 유지
`;

const SnapshotHeader = ({ onOpenModal, fromMyPage }) => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);

  const handleGoBack = () => {
    if (fromMyPage) {
      console.log(`뒤로가기 - fromMyPage: ${fromMyPage}`);
      navigate("/mypage");
    } else {
      console.log(`뒤로가기 - fromMyPage: ${fromMyPage}`);
      navigate("/");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "스냅샷 URL이 복사되었어요 !",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <Header>
      <button onClick={handleGoBack}> ⬅️ </button>
      <ButtonContainer>
        <ShareButton />
      </ButtonContainer>
      {displayMessage && (
        <Message show={showMessage}>
          클립보드에 주소가 복사되었습니다. 친구들에게 공유해보세요!{" "}
        </Message>
      )}
    </Header>
  );
};

export default SnapshotHeader;
