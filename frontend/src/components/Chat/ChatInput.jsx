import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import socket from '../../utils/io';

// 스타일드 컴포넌트 생성
const InputArea = styled.div`
  background-color: red;
  min-height: 50px;
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const PlusButton = styled.div`
  background-color: lightslategray;
  width: 50px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const InputContainer = styled.form`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledInput = styled.input`
  flex-grow: 1; // 입력 필드가 남은 공간을 채우도록
  padding: 5px;
  border-radius: 0;
  border: none;

  &:focus {
    outline: none;
  }
`;

const StyledButton = styled.button`
  min-width: 70px;
  border-radius: 0;
  background-color: #F7E600;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: yellow;
  }

  &:disabled {
    background-color: grey;
    cursor: default;
  }
`;


const ChatInput = () => {
  const [message, setMessage] = useState("");
  
  // socket으로 메시지 전송
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message); // 메시지 전송
      setMessage(""); // 입력 필드 초기화
    }
  }

  return (
    <InputArea>
      <PlusButton>+</PlusButton>
      <InputContainer onSubmit={sendMessage}>
        <StyledInput
          type="text"
          placeholder="채팅을 입력하세요"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />

        <StyledButton
          disabled={message === ""}
          type="submit"
        >
          전송
        </StyledButton>
      </InputContainer>
    </InputArea>
  );
};

export default ChatInput;
