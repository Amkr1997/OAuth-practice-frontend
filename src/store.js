import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./features/todoSlice";
import authorSlice from "./features/authorSlice";

const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
    author: authorSlice.reducer,
  },
});

export default store;
