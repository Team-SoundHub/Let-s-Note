import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chatSlice";
import innerContentReducer from "./slices/innerContentSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    innerContent: innerContentReducer,
  },
});
