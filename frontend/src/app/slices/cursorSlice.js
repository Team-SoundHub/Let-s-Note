import { createSlice } from '@reduxjs/toolkit';

export const cursorSlice = createSlice({
  name: 'cursor',
  initialState: {},
  reducers: {
    updateCursorPosition: (state, action) => {
        const { accountId, x, y, nickname } = action.payload;
        state[accountId] = { x, y, nickname }; 
    },
  },
});

export const { updateCursorPosition } = cursorSlice.actions;

export default cursorSlice.reducer;
