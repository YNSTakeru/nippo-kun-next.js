import { createSlice } from "@reduxjs/toolkit";

const pager = createSlice({
  name: "pager",
  initialState: {
    currentPageName: "home",
  },
  reducers: {
    changeConfirm(state, { type, payload }) {
      state.currentPageName = "confirm";
    },
    changeHome(state, { type, payload }) {
      state.currentPageName = "home";
    },
  },
});

export const { changeConfirm, changeHome } = pager.actions;
export default pager.reducer;
