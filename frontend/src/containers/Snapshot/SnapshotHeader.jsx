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
  background-color: #49c5b6;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  height: 7vh;
`;

const LeftSection = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
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

const SpaceTitle = styled.div`
  flex: 1;
  text-align: center;
  color: white;
  font-size: 25px;
  font-weight: bold;
  margin-left: 1rem;
`;

const SnapshotHeader = ({ onOpenModal, fromMyPage, spaceTitle }) => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);

  const handleGoBack = () => {
    if (fromMyPage) {
      console.log(`뒤로가기 - fromMyPage: ${fromMyPage}`);
      navigate("/");
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
      <LeftSection>
        <button onClick={handleGoBack}>
          <svg
            fill="#ffffff"
            width="1.5rem"
            height="1.5rem"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 8 8"
            enable-background="new 0 0 8 8"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <rect
                x="-0.226"
                y="4.614"
                transform="matrix(0.7071 0.7071 -0.7071 0.7071 4.4884 -0.1417)"
                width="5.283"
                height="1.466"
              ></rect>{" "}
              <rect x="1.607" y="3.161" width="6.375" height="1.683"></rect>{" "}
              <rect
                x="-0.233"
                y="1.921"
                transform="matrix(0.7069 -0.7073 0.7073 0.7069 -1.1708 2.4817)"
                width="5.284"
                height="1.465"
              ></rect>{" "}
            </g>
          </svg>
        </button>
        <SpaceTitle>{spaceTitle}</SpaceTitle>
      </LeftSection>
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
