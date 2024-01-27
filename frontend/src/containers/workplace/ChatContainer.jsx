import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatMessages } from '../../app/slices/chatSlice';
import styled from 'styled-components'
import ChatInput from '../../components/Chat/ChatInput';
import ChatMessage from '../../components/Chat/ChatMessage';

const StyledChatContainer = styled.div`
    height: 100vh;   
    min-width: 25rem;
    max-width: 25rem;
    position: fixed;
    right: 0;
    top: 0;
    
    background-color: white;
    border: 1px solid gray;
`;

const ChatContainer = ({ spaceId }) => {
    const dispatch = useDispatch();    
    const chatMessages = useSelector(state => state.chat.spaces[spaceId]) // 해당 채팅방 메시지 가져오기

    useEffect(() => {
        dispatch(fetchChatMessages(spaceId));
    }, [dispatch, spaceId]); // 작업실이 바뀌면 메시지 목록 새로 받아오기

    // 로컬스토리지에서 닉네임 꺼내기
    // const nickname = localStorage.getItem("nickname");

    return (
        <StyledChatContainer>
            <ChatMessage messageList={chatMessages/* .메시지 목록 */} user={"임시닉넴"} />
            <ChatInput />
        </StyledChatContainer>
    )
}

export default ChatContainer