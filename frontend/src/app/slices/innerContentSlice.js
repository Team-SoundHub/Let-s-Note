import { createSlice } from "@reduxjs/toolkit";

export const innerContentSlice = createSlice({
  name: "innerContent",
  initialState: {
    innerContent: {
      instrument: "piano",
      x: null,
      y: null,
    },
    notes: []
  },
  reducers: {
    setInnerContent: (state, action) => {
      state.innerContent = action.payload;
    },
    setNotesList: (state, action) => {
      // Clear the existing notes before adding new ones
      state.notes = [];

      // notesList에서 각 노트의 정보를 추출하여 상태에 저장
      action.payload.forEach((instrumentGroup) => {
        instrumentGroup.notes.forEach((note) => {
          state.notes.push({
            x: note.noteX,
            y: note.noteY,  
            instrument: instrumentGroup.instrument.toLowerCase()
          });          
        });
      });
      
    }
  },
});

export const { setInnerContent, setNotesList } = innerContentSlice.actions;

export const selectInnerContent = (state) => state.sample.innerContent;
export const selectNotes = (state) => state.innerContent.notes;

export default innerContentSlice.reducer;
