import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { createSnapshot } from '../../api/workspaceApi';

const Header = styled.div`
  background-color: #f3f3f3;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  height: 5vh;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const WorkSpaceHeader = ({ onOpenModal }) => {
  const navigate = useNavigate();

  // 방장인지 여부 체크하고 발매하기 버튼 보이기/ 안보이기 추가
  // 이미 발매했는지 여부 확인하고 발매하기/ 수정하기 추가

  // const handleCreateSnapShot = () => {
  //     navigate('/mysnapshot')

  // }

  // const handleCreateSnapShot = async() => {
  //     try {
  //         const response = await createSnapshot(spaceId);
  //         console.log(response);
  //     } catch (error) {
  //         console.error('발매하기 오류:', error);
  //     }
  // }

  return (
    <Header>
      <Button onClick={onOpenModal}>발간하기</Button>
    </Header>
  );
};

export default WorkSpaceHeader;
