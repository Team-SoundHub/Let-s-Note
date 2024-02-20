import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import tw from "tailwind-styled-components";

// const ModalBackground = tw.div`
//     fixed
//     t-0
//     l-0
//     w-[100%]
//     h-[100%]
//     bg-rgba(0, 0, 0, 0.5);
//     z-50
//     items-center
//     justify-center
//     cursor-pointer
// `;

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
  z-index: 1; // 로그인 박스 아래에 위치
`;

const Container = styled.div`
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
  z-index: 2; // 오버레이 위에 위치
  /* color: #fff; */
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: start;
  justify-content: between;
  padding: 1rem;
  border-radius: 1rem;
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

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end; // 오른쪽 정렬
  gap: 1rem; // 버튼 사이 간격
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

const ModalForm = tw.form`
  space-y-4
`;

const CreateSpaceModal = ({ onClose, onPublish }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Overlay onClick={onClose}>
      <Container
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        onClick={handleContentClick}
      >
        <ModalHeader>
          <H2>작업실 생성하기</H2>
          <ModalCloseButton onClick={onClose}>
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
        <ModalForm onSubmit={handleSubmit}>
          <div>
            <UserBox>
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />
              <label>작업실 이름</label>
            </UserBox>
          </div>
          <div>
            <UserBox>
              <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <label>작업실 설명(선택)</label>
            </UserBox>
          </div>
          <ButtonsContainer>
            <div>
              <FormButton
                type="submit"
                className="w-full"
                onClick={() => onPublish(title, description)}
              >
                생성하기
              </FormButton>
            </div>
          </ButtonsContainer>
        </ModalForm>
      </Container>
    </Overlay>
  );
};

export default CreateSpaceModal;
