import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatMessages } from '../../app/slices/chatSlice';
import styled, { css } from 'styled-components'
import ChatInput from '../../components/Chat/ChatInput';
import ChatMessage from '../../components/Chat/ChatMessage';
import { sendMessage } from '../WebSocket/WebSocketContainer';

const StyledChatContainer = styled.div`
    height: 80vh;
    width: 30vw;
    position: fixed;
    right: 0;
    top: 50%;
    background-color: white;
    border: 1px solid gray;
    border-radius: 10px;
    transform: translateY(-50%) translateX(100%);
    transition: transform 0.4s ease-out;

    ${({ isVisible }) =>
        isVisible &&
        css`
        transform: translateY(-50%) translateX(0);
    `}
`;

// const ChatTab = styled.div`
//     height: 40vh;  
//     width: 3px;  
//     position: fixed;
//     right: -10px;
//     top: 50%;
//     transform: translateY(-50%);
//     background-color: gray;
//     color: white;
//     border-radius: 10px;
//     padding: 5px 10px;
//     cursor: pointer;
// `;

const ChatTab = styled.div`
    position: fixed;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    background-color: #007bff;
    color: white;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 15px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);

    &:after {
        content: '';
        position: absolute;
        border-style: solid;
        border-width: 10px 10px 10px 0;
        border-color: transparent #007bff transparent transparent;
        display: block;
        width: 0;
        z-index: 1;
        right: -10px;
        top: 50%;
        transform: translateY(-50%);
    }
`;


const ChatContainer = ({ spaceId }) => {
    const dispatch = useDispatch();
    const chatMessages = useSelector(state => state.chat.spaces[spaceId]) // 해당 채팅방 메시지 가져오기
    const [isVisible, setIsVisible] = useState(false);
    const chatContainerRef = useRef();

    const accountId = localStorage.getItem("accountId")

    // 채팅 목록 업데이트 관련 로직
    useEffect(() => {
        dispatch(fetchChatMessages(spaceId));
    }, [dispatch, spaceId]); // 작업실이 바뀌면 메시지 목록 새로 받아오기

    const handleSendMessage = (message, nickname) => {
        sendMessage(message, nickname, 1, accountId); 
        // sendMessage(message, nickname, spaceId, accountId); // 방 분리 후에 이걸로 대체
    }


    // 채팅창 토글 관련 로직
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatContainerRef.current && !chatContainerRef.current.contains(event.target)) {
                setIsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [chatContainerRef]);

    const toggleChatContainer = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            <ChatTab onClick={toggleChatContainer}>채팅</ChatTab>
            <StyledChatContainer ref={chatContainerRef} isVisible={isVisible}>
                <ChatMessage messageList={chatMessages} />
                <ChatInput handleSendMessage={handleSendMessage} />
            </StyledChatContainer>
        </>
    )
}

export default ChatContainer