import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./features/todoSlice";
import authorSlice from "./features/authorSlice";
import apiSlice from "./features/apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    todos: todoSlice.reducer,
    author: authorSlice.reducer,
  },

  middleware: (prevMiddleware) => prevMiddleware().concat(apiSlice.middleware),
});

export default store;
