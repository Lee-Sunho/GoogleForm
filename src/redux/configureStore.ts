import { configureStore } from "@reduxjs/toolkit";
import titleSlice from "./modules/titleSlice";
import focusSlice from "./modules/focusSlice";
import questionSlice from "./modules/questionSlice";

const store = configureStore({
  reducer: {
    title: titleSlice,
    focus: focusSlice,
    question: questionSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
