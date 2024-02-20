import React, {useState} from 'react';
import tw from "tailwind-styled-components";
import styled from "styled-components";
import Button from "../common/Button";

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 배경을 어둡게 */
    z-index: 50;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
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

const AiChordModal = ({handleAIChordModalClose, accountId, handleChordAI, sendCoordinate}) => {

    return (
        <ModalBackground onClick={handleAIChordModalClose}>
            <ModalContainer onClick={e => e.stopPropagation()}>
                <ModalMain>
                    <ModalHeader>
                        <ModalTitle>AI에게 어울리는 화음 추천받기</ModalTitle>
                        <ModalCloseButton onClick={handleAIChordModalClose}>X</ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <ModalForm>
                            <div>
                                <div className={"pb-4"}>
                                    <span className={"pb-4"}>
                                    현재까지 입력하신 음을 바탕으로 어울리는 화음을 추천해 줍니다.
                                    </span>
                                </div>
                            </div>
                            <div className={"flex justify-center content-center"}>
                                <Button type="button" onClick={() => handleChordAI(accountId, sendCoordinate)}>생성</Button>
                            </div>
                        </ModalForm>
                    </ModalBody>
                </ModalMain>
            </ModalContainer>
        </ModalBackground>
    );
};

export default AiChordModal;