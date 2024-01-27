import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getChatMessages from '../../api/chatApi';

/* 
getChatMessages는 createAsyncThunk를 사용하여 정의된 비동기 액션입니다. 
이 함수는 chatApi.js에 정의된 getChatMessages API 함수를 호출하고, 그 결과(응답)를 반환합니다.
*/
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
    spaces: {}, // 채팅방별 메시지와 상태 관리
  },
  reducers: {
    // 여기에 채팅 관련 리듀서 추가
  },
  // createSlice에서 정의된 일반 액션(reducers)과 별도로, 외부(createAsyncThunk)에 의해 생성된 비동기 액션 처리
  extraReducers: (builder) => {
    builder.addCase(fetchChatMessages.fulfilled, (state, action) => {
      const { spaceId, messages } = action.payload;
      state.spaces[spaceId] = messages;
    });
    // 기타 액션 핸들러...
  },
});

export { fetchChatMessages };
export default chatSlice.reducer;
