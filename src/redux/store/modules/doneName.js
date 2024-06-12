import { createSlice } from "@reduxjs/toolkit";

const doneNamer = createSlice({
  name: "doneNamer",
  initialState: {
    doneName: "",
  },
  reducers: {
    changeDoneName(state, { type, payload }) {
      state.doneName = payload.doneName;
    },
  },
});

export const { changeDoneName } = doneNamer.actions;
export default doneNamer.reducer;
