import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_SERVER_URL;

export const fetchTodos = createAsyncThunk("fetch/todos", async () => {
  try {
    const allTodos = await axios.get(`${API_URL}/get/todos`);

    console.log(allTodos);
  } catch (error) {
    console.log(error);
  }
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: "idle",
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(
      fetchTodos.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = "fullfilled";
      state.todos = action.payload;
    });

    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });
  },
});

export default todoSlice;
