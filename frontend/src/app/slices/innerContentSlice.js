import { createSlice } from "@reduxjs/toolkit";

export const innerContentSlice = createSlice({
  name: "innerContent",
  initialState: {
    innerContent: {
      instrument: "piano",
      x: null,
      y: null,
    },
    workspaceNotes: [],
    snapshotNotes: [],
  },
  reducers: {
    setInnerContent: (state, action) => {
      state.innerContent = action.payload;
    },
    setWorkspaceNotes: (state, action) => {
      state.workspaceNotes = [];

      // notesList에서 각 노트의 정보를 추출하여 상태에 저장
      action.payload.forEach((instrumentGroup) => {
        instrumentGroup.notes.forEach((note) => {
          state.workspaceNotes.push({
            x: note.noteX,
            y: note.noteY,
            instrument: instrumentGroup.instrument.toLowerCase(),
          });
        });
      });
      console.log("리덕스 - workspace에 들어간 정보:", state.workspaceNotes);
      console.log("리덕스 - snapshot에 들어간 정보:", state.snapshotNotes);
    },

    setSnapshotNotes: (state, action) => {
      state.snapshotNotes = [];

      action.payload.forEach((instrumentGroup) => {
        if (instrumentGroup.notes) {
          instrumentGroup.notes.forEach((note) => {
            state.snapshotNotes.push({
              x: note.noteX,
              y: note.noteY,
              instrument: instrumentGroup.instrument.toLowerCase(),
            });
          });
        }
      });
      console.log("리덕스 - workspace에 들어간 정보:", state.workspaceNotes);
      console.log("리덕스 - snapshot에 들어간 정보:", state.snapshotNotes);
    },
    clearAllNotes: (state) => {
      state.innerContent = { instrument: "piano", x: null, y: null };
      state.workspaceNotes = [];
      state.snapshotNotes = [];
    },
  },
});

export const {
  setInnerContent,
  setWorkspaceNotes,
  setSnapshotNotes,
  clearAllNotes,
} = innerContentSlice.actions;

export const selectInnerContent = (state) => state.sample.innerContent;
export const selectNotes = (state) => state.innerContent.notes;

export default innerContentSlice.reducer;
