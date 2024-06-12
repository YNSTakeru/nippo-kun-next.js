import { createSlice } from "@reduxjs/toolkit";

const metaDater = createSlice({
  name: "metadater",
  initialState: {
    metaData: {
      date: new Date(),
      learningTime: 11,
      mind: "まあまあ",
    },
  },
  reducers: {
    setDate(state, { type, payload }) {
      state.metaData.date = payload;
    },
    setLearningTime(state, { type, payload }) {
      state.metaData.learningTime = payload;
    },
    setMind(state, { type, payload }) {
      state.metaData.mind = payload;
    },
  },
});

export const { setDate, setLearningTime, setMind } = metaDater.actions;
export default metaDater.reducer;
