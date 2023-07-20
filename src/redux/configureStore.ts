import { configureStore } from "@reduxjs/toolkit";
import titleSlice from "./modules/titleSlice";
import focusSlice from "./modules/focusSlice";

const store = configureStore({
  reducer: {
    title: titleSlice,
    focus: focusSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
