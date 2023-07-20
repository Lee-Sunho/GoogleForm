import { createSlice } from "@reduxjs/toolkit";

const focusSlice = createSlice({
  name: "focusSlice",
  initialState: {
    focus: -1,
  },
  reducers: {
    setFocus: (state, action) => {
      state.focus = action.payload;
    },
  },
});

export const { setFocus } = focusSlice.actions;
export default focusSlice.reducer;
