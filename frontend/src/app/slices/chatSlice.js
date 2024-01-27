import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getChatMessages from '../../api/chatApi';

// createAsyncThunk를 사용하여 처음 작업실 입장시 채팅 기록 가져오는 걸 비동기로 처리
const fetchChatMessages = createAsyncThunk(
  'chat/fetchChatMessages',
  async (spaceId) => {
    const response = await getChatMessages(spaceId);
    return response.data;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    spaces: {}, // 작업실별 메시지와 상태 관리
  },
  reducers: {
    addMessage: (state, action) => {
      const { spaceId, message } = action.payload;
      if (!state.spaces[spaceId]) {
        state.spaces[spaceId] = [];
      }
      state.spaces[spaceId].push(message);
    },    
  },

  // createAsyncThunk에 의해 생성된 비동기 액션 처리.   
  extraReducers: (builder) => {
    builder.addCase(fetchChatMessages.fulfilled, (state, action) => {
      const { spaceId, messages } = action.payload;
      state.spaces[spaceId] = messages;
    });
  },
});

export const { addMessage } = chatSlice.actions;
export { fetchChatMessages };
export default chatSlice.reducer;
