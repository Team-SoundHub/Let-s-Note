import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chatSlice";
import innerContentReducer from "./slices/innerContentSlice";
import imageSliceReducer from "./slices/imageSlice";
import cursorReducer from "./slices/cursorSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    innerContent: innerContentReducer,
    image: imageSliceReducer,
    cursor: cursorReducer
  },
});
