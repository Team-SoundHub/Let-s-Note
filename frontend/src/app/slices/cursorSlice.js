import { createSlice } from '@reduxjs/toolkit';

export const cursorSlice = createSlice({
  name: 'cursor',
  initialState: {
    positions: {},
    hover: { i: 0, j: 0, x: 0, y: 0 }
  },
  reducers: {
    updateCursorPosition: (state, action) => {
        const { accountId, x, y, userId } = action.payload;
        state.positions[accountId] = { x, y, userId }; 
    },
    setHoverPosition: (state, action) => {
      state.hover = action.payload; // Update hover position
    },
    clearCursorPosition: (state, action) => {
      const { userId } = action.payload;
      // positions 객체 내의 각 요소를 순회하며 주어진 userId와 일치하는 요소 찾기
      Object.keys(state.positions).forEach((accountId) => {
        if (state.positions[accountId].userId === userId) {
          // userId가 일치하는 경우 해당 요소 삭제
          // console.log(`[cursorSlice] 나간 애: ${userId}`);
          delete state.positions[accountId];
        }
      });
    }
  },
});

export const { updateCursorPosition, setHoverPosition, clearCursorPosition } = cursorSlice.actions;

export default cursorSlice.reducer;
