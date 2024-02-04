import React, { useState } from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import Button from "../common/Button";

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

// 왜인지는 모르겠지만, 스타일드 컴포넌트로 해야 모달 뒤 배경을 검게 만드는 효과가 적용됨
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000; // 높은 z-index 값 설정
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = tw.div`
  fixed
  overflow-y-auto
  overflow-x-hidden
  flex
  z-50
  justify-center
  items-center
  w-full
  md:inset-0
  h-[calc(100%-1rem)]
  max-h-full
`;

const ModalContent = tw.div`
  relative
  p-4
  w-full
  max-w-md
  max-h-full
`;

const ModalMain = tw.div`
  relative
  bg-white
  rounded-lg
  shadow
  dark:bg-gray-700
`;

const ModalHeader = tw.div`
  flex
  items-center
  justify-between
  p-4
  md:p-5
  border-b
  rounded-t
  dark:border-gray-600
`;

const ModalTitle = tw.h3`
  text-xl
  font-semibold
  text-gray-900
  dark:text-white
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

const ModalBody = tw.div`
  p-4
  md:p-5
`;

const ModalForm = tw.form`
  space-y-4
`;

const ModalInput = tw.input`
  bg-gray-50
  border
  border-gray-300
  text-gray-900
  text-sm
  rounded-lg
  focus:ring-blue-500
  focus:border-blue-500
  block
  w-full
  p-2.5
  dark:bg-gray-600
  dark:border-gray-500
  dark:placeholder-gray-400
  dark:text-white
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
    <ModalBackground onClick={onClose}>
      <ModalContainer
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <ModalContent onClick={handleContentClick}>
          <ModalMain>
            <ModalHeader>
              <ModalTitle>작업실 생성하기</ModalTitle>
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
            <ModalBody>
              <ModalForm onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    작업실 이름을 정해주세요
                  </label>
                  <ModalInput
                    type="text"
                    placeholder="작업실 이름"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    작업실 설명(선택)
                  </label>
                  <ModalInput
                    type="text"
                    placeholder="작업실 설명"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="w-full"
                    onClick={() => onPublish(title, description)}
                  >
                    생성하기
                  </Button>
                </div>
              </ModalForm>
            </ModalBody>
          </ModalMain>
        </ModalContent>
      </ModalContainer>
    </ModalBackground>
  );
};

export default CreateSpaceModal;
