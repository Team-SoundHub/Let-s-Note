import { configureStore } from "@reduxjs/toolkit";
import { innerContentSlice } from "./innerContentSlice";

export const store = configureStore({
  reducer: {
    innerContent: innerContentSlice,
  },
});
