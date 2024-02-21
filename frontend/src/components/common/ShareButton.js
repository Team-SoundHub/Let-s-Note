import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import shareIcon from "../../assets/shareIcon2.png";
import Swal from "sweetalert2";

const ShareButtonCss = styled.button`
  color: black;
  background-color: white;
  background-image: url(${shareIcon});
  background-size: 70%;
  background-position: center; // 이미지 위치 조절
  background-repeat: no-repeat; // 이미지 반복 방지
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: large;

  &:hover {
    transform: scale(1.1);
  }
`;

const ShareButton = () => {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    Swal.fire({
      position: "middle",
      icon: "success",
      title: "스냅샷 URL이 복사되었어요 !",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return <ShareButtonCss onClick={handleShare} />;
};

export default ShareButton;
