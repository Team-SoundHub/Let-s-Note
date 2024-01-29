import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';


const StyledContainer = styled.div`
  padding: 10px; 
`;

const MessagesContainer = styled.div`
  max-height: 70vh; 
  overflow-y: auto;  // 세로 스크롤바 활성화
`;

const SystemMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SystemMessage = styled.p`
  background-color: #55667758;
  border-radius: 100px;
  text-align: center;
  color: white;
  padding: 2px 15px;
  font-size: 14px;
`;

const MyMessageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
`;

const MyMessage = styled.div`
  background-color: #f7e600;
  border-radius: 8px;
  padding: 8px;
  max-width: 200px;
  font-size: 12px;
`;

const OthersMessageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const OthersMessage = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 8px;
  max-width: 200px;
  font-size: 12px;
`;

const ProfileImage = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%; /* 원 모양으로 고정 */
  margin-right: 10px;
  background-color: #ccc; /* 원의 배경색 */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: #333; /* 글자색 */

  @media screen and (max-width: 768px) {    
      width: 15px;  // 크기를 줄임
      height: 15px; // 크기를 줄임
      border-radius: 50%; /* 원 모양으로 고정 */
      margin-right: 10px;
      background-color: #ccc; /* 원의 배경색 */
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
      color: #333; /* 글자색 */    
  }
`;


const ChatMessage = ({ messageList = [] }) => {
  const nickname = localStorage.getItem("nickname");
  const [localMessageList, setLocalMessageList] = useState(messageList);
  const messagesEndRef = useRef(null);  // 스크롤 위치를 위한 ref


  useEffect(() => {
    // WebSocket 구독 로직은 WebSocketContainer에서 처리되므로, 여기서는 Redux 상태를 감시
    setLocalMessageList(messageList);
  }, [messageList]);

  useEffect(() => {
    // 새 메시지가 추가될 때 스크롤을 하단으로 이동
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    console.log(localMessageList);
  }, [localMessageList]);

  return (
    <MessagesContainer>
      {localMessageList.map((message) => {
        return (
          <StyledContainer key={message._id}>
            {message.nickname === nickname ? (
              <MyMessageContainer>
                {/* <ProfileImage>{message.nickname.substring(0)}</ProfileImage> */}
                <ProfileImage>{1}</ProfileImage>
                {message.nickname}
                <MyMessage>{message.msgContent}</MyMessage>
                {message.timestamp}
              </MyMessageContainer>
            ) : (
              <OthersMessageContainer>
                {/* <ProfileImage>{message.nickname.substring(0)}</ProfileImage>                 */}
                <ProfileImage>{2}</ProfileImage>                
                {message.nickname}
                <OthersMessage>{message.msgContent}</OthersMessage>
                {message.timestamp}
              </OthersMessageContainer>
            )
            }
          </StyledContainer>
        )
      })}
      <div ref={messagesEndRef} />
    </MessagesContainer>
  );
};

export default ChatMessage;
