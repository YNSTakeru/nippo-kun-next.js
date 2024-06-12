import { createSlice } from "@reduxjs/toolkit";

const confirmReporter = createSlice({
  name: "confirmReporter",
  initialState: {
    confirmReport: "",
  },
  reducers: {
    setReport(state, { type, payload }) {
      state.confirmReport = payload;
    },
  },
});

export const { setReport } = confirmReporter.actions;
export default confirmReporter.reducer;
