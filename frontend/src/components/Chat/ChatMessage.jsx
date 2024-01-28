import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  padding: 10px; 
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

const ProfileImage = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 100px;
  margin-right: 10px;
`;


const ChatMessage = ({ messageList = [] }) => {
    const nickname = localStorage.getItem("nickname");
    const [localMessageList, setLocalMessageList] = useState(messageList);

    useEffect(() => {
        // WebSocket 구독 로직은 WebSocketContainer에서 처리되므로, 여기서는 Redux 상태를 감시
        setLocalMessageList(messageList);
    }, [messageList]);

    // 만약에 작업실 안에서 보낸 메시지가 포함이 안되면, 로컬에서 처리하는 식으로 바꾸기

    return (
        <div>
            {localMessageList.map((message, index) => {
                return (
                    <StyledContainer key={message._id}>
                        <MyMessageContainer>
                            {message.accountId}
                            <MyMessage>{message.msgContent}</MyMessage>
                            {message.timestamp}
                        </MyMessageContainer>
                    </StyledContainer>
                );
            })}
        </div>
    );
};

export default ChatMessage;
