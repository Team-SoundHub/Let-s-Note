import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './slices/chatSlice'
import { innerContentSlice } from "../app/slices/innerContentSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer, 
    innerContent: innerContentSlice,
  }
})
