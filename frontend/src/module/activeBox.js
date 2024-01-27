import { createSlice } from "@reduxjs/toolkit";

export const activeBoxSlice = createSlice({
  name: "activeBox",
  initialState: {
    activeBoxes: [],
    activeNotes: [],
  },
  reducers: {
    updateActiveBoxes: (state, action) => {
      state.activeBoxes = action.payload;
    },
    updateActiveNotes: (state, action) => {
      state.activeNotes = action.payload;
    },
    resetActiveBox: (state) => {
      state.activeBoxes = [];
      state.activeNotes = [];
    },
  },
});

export const { updateActiveBoxes, updateActiveNotes, resetActiveBox } =
  activeBoxSlice.actions;

export const selectActiveBoxes = (state) => state.activeBoxes.activeBoxes;
export const selectActiveNotes = (state) => state.activeBoxes.activeNotes;

export default activeBoxSlice.reducer;
