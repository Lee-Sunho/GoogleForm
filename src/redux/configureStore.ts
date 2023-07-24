import { combineReducers, configureStore } from "@reduxjs/toolkit";
import titleSlice from "./modules/titleSlice";
import focusSlice from "./modules/focusSlice";
import questionSlice from "./modules/questionSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const reducers = combineReducers({
  title: titleSlice,
  focus: focusSlice,
  question: questionSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
