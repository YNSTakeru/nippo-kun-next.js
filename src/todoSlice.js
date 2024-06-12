import { createSlice } from "@reduxjs/toolkit";

// const yesterdayTasks = localStorage.getItem("yesterday")
//   ? JSON.parse(localStorage.getItem("yesterday"))
//   : [];
// const storedTomorrow = localStorage.getItem("tomorrow")
//   ? JSON.parse(localStorage.getItem("tomorrow"))
//   : [];

const initialState = {
  tomorrow: [],
  todo: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodo: (state, action) => {
      state.todo = action.payload;
    },
    addTodo: (state, action) => {
      state.tomorrow.push(action.payload);
      // localStorage.setItem("tomorrow", JSON.stringify(state.tomorrow));
    },
    removeTodo: (state, action) => {
      state.tomorrow = state.tomorrow.filter(
        (_, index) => index !== action.payload
      );
      // localStorage.setItem("tomorrow", JSON.stringify(state.tomorrow));
    },
    updateTodo: (state, action) => {
      const { index, content } = action.payload;
      state.tomorrow[index] = content;
      // localStorage.setItem("tomorrow", JSON.stringify(state.tomorrow));
    },
  },
});

export const { setTodo, addTodo, removeTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
