import { createSlice } from "@reduxjs/toolkit";

export const innerContentSlice = createSlice({
  name: "innerContent",
  initialState: {
    innerContent: {
      instrument: "piano",
      x: null,
      y: null,
    },
  },
  reducers: {
    setInnerContent: (state, action) => {
      state.innerContent = action.payload;
    },
  },
});

export const { setInnerContent } = innerContentSlice.actions;

export const selectInnerContent = (state) => state.sample.innerContent;

export default innerContentSlice.reducer;
