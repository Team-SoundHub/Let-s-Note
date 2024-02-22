import { createSlice } from '@reduxjs/toolkit';

export const bpmSlice = createSlice({
  name: 'bpm',
  initialState: {
    bpm: 160,    
  },
  reducers: {
    updateBpm: (state, action) => {        
        state.bpm = action.payload; 
    },
  },
});

export const { updateBpm } = bpmSlice.actions;

export default bpmSlice.reducer;
