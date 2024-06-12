import { createSlice } from "@reduxjs/toolkit";

const loader = createSlice({
  name: "loader",
  initialState: {
    isLoading: true,
  },
  reducers: {
    startLoading(state, { type, payload }) {
      state.isLoading = true;
    },
    endLoading(state, { type, payload }) {
      state.isLoading = false;
    },
  },
});

export const { startLoading, endLoading } = loader.actions;
export default loader.reducer;
