import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import tw from "tailwind-styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;    
  }
  to {
    opacity: 1;    
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3); // 어두운 배경
  backdrop-filter: blur(5px); // 블러 효과
  z-index: 20; // 로그인 박스 아래에 위치
`;

const AddMemberBox = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 27rem;
  /* padding: 40px; */
  padding: 2.5rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  z-index: 21; // 오버레이 위에 위치
  /* color: #fff; */
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end; // 오른쪽 정렬
  gap: 1rem; // 버튼 사이 간격
  margin-top: -2rem;
`;

const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 30px;
  padding: 0;
  color: #569d94;
  text-align: center;
`;

const UserBox = styled.div`
  position: relative;
  input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #569d94;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #84c4bd;
    outline-offset: 0;
    outline: none;
    background: transparent;
  }
  label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #569d94;
    pointer-events: none;
    transition: 0.5s;
  }
  input:focus {
    box-shadow: none;
    border-bottom: 1px solid #84c4bd;
  }
  input:focus ~ label,
  input:valid ~ label {
    top: -20px;
    left: 0;
    color: #569d94;
    font-size: 12px;
  }
`;

const FormButton = styled.a`
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #569d94;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 90%;
    left: 10%;
    width: 0;
    height: 2px;
    background: #569d94;
    transition: 0.3s;
  }

  &:hover::before {
    width: 80%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: start;
  justify-content: between;
  padding: 1rem;
  border-radius: 1rem;
`;

const ModalCloseButton = tw.button`
  end-2.5
  text-gray-400
  bg-transparent
  hover:bg-gray-200
  hover:text-gray-900
  rounded-lg
  text-sm
  w-8
  h-8
  ms-auto
  inline-flex
  justify-center
  items-center
  dark:hover:bg-gray-600
  dark:hover:text-white
`;


// 멤버 목록 관련
const MemberListTitle = styled.p`
  font-weight: 700;
  margin: 20px 0rem -0.5rem 0;
  line-height: 25px;
  /* transform: translateX(-200px); */
  transition-delay: 0.2s;
  color: #569d94;
  opacity: 1;
  transition: all 0.6s ease-in-out;
`;

const MembersList = styled.ul`
  margin-top: 16px;
  margin-bottom: 16px;
  overflow-y: auto; 
  background-color: #f3f4f6;
  height: 10rem;
  max-height: 80%; 
  width: 100%;
  padding-top: 0.5rem;
  padding-right: 0.5rem; // Adds some space for the scrollbar
  border: 1px solid #569d94;
  border-radius: 5px;
  /* box-shadow: inset 0 0 5px rgba(0,0,0,0.2); // Adds subtle inner shadow to indicate depth */
  /* background-color: #f3f4f6; // Adjusted for better visibility against the crown icon */
`;

const MemberItem = styled.li`
  margin-bottom: 12px;
  display: flex;
  align-items: center;
`;

const MemberNicknameSpan = styled.span`
  display: flex;
  /* width: 15rem; */
  width: 90%;
  align-items: center;
  border-radius: 0.375rem; 
  /* background-color: #f3f4f6; */
  background-color: white;
  padding: 0.75rem; 
  margin: auto;  
  font-size: 0.875rem; 
  font-weight: bold; 
  color: #1f2937; 
  &:hover {
    background-color: #84c4bd; 
    box-shadow: 0 10px 15px -3px rgba(230, 113, 113, 0.1), 0 4px 6px -2px rgba(231, 145, 145, 0.05); 
  }  
`;

const AddMemberModal = ({ closeAddMemberModal, handleAddMember, memberList }) => {
  const [userId, setUserId] = useState("");
  const [members, setMembers] = useState(memberList);

  useEffect(() => {
    setMembers(memberList);
  }, [memberList])

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  const handleInputChange = (event) => {
    console.log("멤버 목록:", memberList);
    setUserId(event.target.value);
  };

  return (
    <Overlay onClick={closeAddMemberModal}>
      <AddMemberBox
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        onClick={handleContentClick}
      >
        <ModalHeader>
          <H2>멤버 추가하기</H2>
          <ModalCloseButton
            data-modal-hide="authentication-modal"
            onClick={closeAddMemberModal}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </ModalCloseButton>
        </ModalHeader>

        <UserBox>
          <input
            type="text"
            id="userId"
            onChange={handleInputChange}
            value={userId}
            required
          />
          <label>유저 ID</label>
        </UserBox>

        <MemberListTitle>참여 멤버: {members.length}명</MemberListTitle>
        <MembersList>
          {members.map((member, index) => (
            <MemberItem key={index}>
              <MemberNicknameSpan>{member}
              </MemberNicknameSpan>
            </MemberItem>
          ))}
        </MembersList>
        <ButtonsContainer>
          <FormButton type="submit" onClick={handleAddMember}>
            추가
          </FormButton>
        </ButtonsContainer>
      </AddMemberBox>
    </Overlay>
  );
};

export default AddMemberModal;
