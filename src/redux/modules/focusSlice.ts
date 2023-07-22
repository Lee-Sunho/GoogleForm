import { createSlice } from "@reduxjs/toolkit";

const focusSlice = createSlice({
  name: "focusSlice",
  initialState: {
    focusedId: "",
  },
  reducers: {
    setFocus: (state, action) => {
      state.focusedId = action.payload;
    },
  },
});

export const { setFocus } = focusSlice.actions;
export default focusSlice.reducer;
