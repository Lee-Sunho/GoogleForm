import { createSlice } from "@reduxjs/toolkit";

const titleSlice = createSlice({
  name: "titleSlice",
  initialState: {
    title: "제목 없는 설문지",
    description: "",
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
  },
});

export const { setTitle, setDescription } = titleSlice.actions;
export default titleSlice.reducer;
