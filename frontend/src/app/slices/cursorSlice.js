import { createSlice } from '@reduxjs/toolkit';

export const cursorSlice = createSlice({
  name: 'cursor',
  initialState: {
    positions: {},
    hover: { i: 0, j: 0, x: 0, y: 0 }
  },
  reducers: {
    updateCursorPosition: (state, action) => {
        const { accountId, x, y, nickname } = action.payload;
        state.positions[accountId] = { x, y, nickname }; 
    },
    setHoverPosition: (state, action) => {
      state.hover = action.payload; // Update hover position
    },
    // clearCursorPosition: (state, action) => {
    //   const { accountId } = action.payload;
    //   if(state.positions[accountId]) {
    //     delete state.positions[accountId];
    //   }
    // }
  },
});

export const { updateCursorPosition, setHoverPosition } = cursorSlice.actions;

export default cursorSlice.reducer;
