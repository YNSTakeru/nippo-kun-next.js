import { createSlice } from "@reduxjs/toolkit";

const allReviewr = createSlice({
  name: "allReviewr",
  initialState: {
    allReview: "",
  },
  reducers: {
    reviewWrite(state, { type, payload }) {
      state.allReview = payload;
    },
  },
});

export const { reviewWrite } = allReviewr.actions;
export default allReviewr.reducer;
