import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const StyledContainer = styled.div`
  padding: 10px;
  background-color: #f0f0f0;
`;

const MessagesContainer = styled.div`
  height: 80vh;
  overflow-y: auto;
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 10px;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 5px;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Nickname = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 0.9rem;
`;

const MyMessage = styled.div`
  background-color: #f7e600;
  border-radius: 8px;
  padding: 8px;
  max-width: 200px;
  font-size: 12px;
  margin-bottom: 5px;
`;

const OthersMessage = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 8px;
  max-width: 95%;
  font-size: 12px;
  margin-bottom: 5px;
`;

const Timestamp = styled.span`
  font-size: 10px;
  color: #a0a0a0;
`;

const ProfileImage = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: #333;

  @media screen and (max-width: 768px) {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin-right: 10px;
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
`;

const ChatMessage = ({
  messageList = [],
  memberList = [],
  spaceId,
  nickname,
}) => {
  const [localMessageList, setLocalMessageList] = useState(messageList);
  const messagesEndRef = useRef(null); // 스크롤 위치를 위한 ref
  const messagesContainerRef = useRef(null);
  const accountId = sessionStorage.getItem("accountId");

  useEffect(() => {
    // messageList에 새 메시지가 추가된 경우에만 localMessageList 업데이트
    if (messageList.length !== localMessageList.length) {
      setLocalMessageList(messageList);
    }

    // console.log(memberList);
  }, [messageList, localMessageList.length]);

  // useEffect(() => {
  //   // 스크롤을 컨테이너의 최하단으로 설정
  //   const scrollHeight = messagesContainerRef.current.scrollHeight;
  //   messagesContainerRef.current.scrollTop = scrollHeight;
  // }, []);

  useEffect(() => {
    // 새 메시지가 추가될 때 스크롤을 하단으로 이동
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessageList]);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [])

  const renderMessageContent = (message) => {
    // 이미지 URL인 경우 이미지로 표시
    if (message.msgContent.startsWith("http")) {
      return (
        <img
          src={message.msgContent}
          alt="uploaded"
          style={{ maxWidth: "200px" }}
        />
      );
    }

    // 텍스트 메시지인 경우
    return <span>{message.msgContent}</span>;
  };

  return (
    <MessagesContainer>
      {localMessageList.map((message) => {
        // console.log("메시지응답:", message);
        // console.log("메시지응답 accountId:", message.accountId);
        // console.log("prop 닉네임:", nickname);
        return (
          <StyledContainer key={message._id}>
            <MessageContainer>
              <ProfileImage>{1}</ProfileImage>{" "}
              {/* 여기에 실제 이미지 URL을 적용할 수 있습니다 */}
              <MessageContent>
                <Nickname>{message.nickname}</Nickname>
                {message.accountId === accountId ? (
                  <MyMessage>{renderMessageContent(message)}</MyMessage>
                ) : (
                  <OthersMessage>{renderMessageContent(message)}</OthersMessage>
                )}
                <Timestamp>{message.timestamp}</Timestamp>
              </MessageContent>
            </MessageContainer>
          </StyledContainer>
        );
      })}
      <div ref={messagesEndRef} />
    </MessagesContainer>
  );
};

export default ChatMessage;
