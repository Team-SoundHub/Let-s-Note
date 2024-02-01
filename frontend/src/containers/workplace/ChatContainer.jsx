import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatMessages } from "../../app/slices/chatSlice";
import styled, { css } from "styled-components";
import ChatInput from "../../components/Chat/ChatInput";
import ChatMessage from "../../components/Chat/ChatMessage";
import { sendMessage } from "../WebSocket/WebSocketContainer";
import chatImage from "../../assets/bubble-chat2.png";

const StyledChatContainer = styled.div`
  height: 90vh;
  width: 30vw;
  position: fixed;
  right: 0;
  top: 50%;
  background-color: white;
  border: 1px solid gray;
  border-radius: 10px;
  // transition: transform 0.4s ease-out;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  ${({ isVisible }) =>
    isVisible &&
    css`
      transform: translateY(-50%) translateX(0);
    `}
`;

const ChatTab = styled.div`
  position: fixed;
  right: 2rem;
  top: 10%;
  transform: translateY(-50%);
  background-image: url(${chatImage});
  background-size: cover; // 이미지 크기를 컨테이너에 맞게 조절
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: all 0.3s ease; // 부드러운 효과를 위한 전환

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transform: translateY(-50%) scale(1.1);
  }
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #49c5b6;
  color: white;
  cursor: move; // 드래그 가능한 커서 모양

  &:hover {
    background-color: #277a70;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  cursor: pointer;
  color: white;
  &:after {
    content: "x";
    font-size: 1.3rem;
    font-weight: bold;
  }

  &:hover {
    transform: scale(1.1);
    color: black;
  }
`;

const ChatContainer = ({ spaceId, memberList, nickname }) => {
  const dispatch = useDispatch();
  const chatMessages = useSelector((state) => state.chat.spaces[spaceId]); // 해당 채팅방 메시지 가져오기
  const [isVisible, setIsVisible] = useState(false);

  const accountId = sessionStorage.getItem("accountId");

  // 채팅 목록 업데이트 관련 로직
  useEffect(() => {
    dispatch(fetchChatMessages(spaceId));
  }, [dispatch, spaceId]); // 작업실이 바뀌면 메시지 목록 새로 받아오기

  const handleSendMessage = (message) => {
    sendMessage(message, accountId, spaceId);
  };

  // 채팅창 토글 관련 로직
  const closeChatContainer = (e) => {
    e.stopPropagation(); // 이벤트 버블링(상위 컴포넌트로 이벤트가 전파되어 드래그앤드롭으로 인식) 방지
    setIsVisible(false);
  };

  const toggleChatContainer = () => {
    setIsVisible(!isVisible);
  };

  // 드래그앤드롭 관련 상태와 로직
  const chatContainerRef = useRef();
  const chatHeaderRef = useRef();
  const closeButtonRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [originalPosition, setOriginalPosition] = useState({ x: 0, y: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target === closeButtonRef.current) {
      e.stopPropagation();
      setIsVisible(false);
      return;
    }

    if (e.target === chatHeaderRef.current) {
      setIsDragging(true);
      setOriginalPosition({
        x: e.clientX - translate.x,
        y: e.clientY - translate.y,
      });
      // console.log("채팅창 x:", e.clientX - translate.x, "채팅창 y:", e.clientY - translate.y);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - originalPosition.x;
    const newY = e.clientY - originalPosition.y;
    setTranslate({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    // 헤더 드롭시 액션
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, originalPosition]);

  return (
    <>
      <ChatTab onClick={toggleChatContainer}></ChatTab>
      <StyledChatContainer
        ref={chatContainerRef}
        isVisible={isVisible}
        style={{
          transform: `
                    translateY(-50%) 
                    translateX(${isVisible ? "0" : "100%"}) 
                    translate(${translate.x}px, ${translate.y}px)
                `,
          display: isVisible ? "block" : "none",
        }}
      >
        <ChatHeader ref={chatHeaderRef} onMouseDown={handleMouseDown}>
          <div> 채팅하기 </div>
        </ChatHeader>
        <CloseButton ref={closeButtonRef} onClick={closeChatContainer} />
        <ChatMessage
          messageList={chatMessages}
          memberList={memberList}
          spaceId={spaceId}
          nickname={nickname}
        />
        <ChatInput handleSendMessage={handleSendMessage} />
      </StyledChatContainer>
    </>
  );
};

export default ChatContainer;
