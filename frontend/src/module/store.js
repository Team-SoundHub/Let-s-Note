import { configureStore } from "@reduxjs/toolkit";
import sampleReducer from "./sampleSlice"; // 지우고 쓰시면 됩니다

export const store = configureStore({
  reducer: {
    sampleKey: sampleReducer, // 지우고 쓰시면 됩니다
  },
});
