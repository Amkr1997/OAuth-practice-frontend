import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const API_URL = import.meta.env.VITE_SERVER_URL;

export const postAuthorDetails = createAsyncThunk(
  "post/author",
  async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/add/author`, userData);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAllAuthors = createAsyncThunk("get/all/authors", async () => {
  try {
    const response = await axios.get(`${API_URL}/get/authors`);

    return response?.data?.authors;
  } catch (error) {
    console.log(error);
  }
});

export const fetchAuthor = createAsyncThunk(
  "single/author",
  async (authorId) => {
    try {
      const response = await axios.get(`${API_URL}/get/author/${authorId}`);

      return response?.data?.singleAuthor;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateAuthorAsync = createAsyncThunk(
  "update/Author",
  async (authorData) => {
    try {
      const response = await axios.post(
        `${API_URL}/update/author/${authorData._id}`,
        authorData
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
);

const authorSlice = createSlice({
  name: "author",
  initialState: {
    author: [],
    allAuthors: [],
    status: "idle",
    error: null,
    isAuthenticated: Cookies.get("googleTodo_access_token") || "",
  },

  extraReducers: (builder) => {
    builder.addCase(
      postAuthorDetails.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(postAuthorDetails.fulfilled, (state) => {
      state.status = "fullfilled";
    });

    builder.addCase(postAuthorDetails.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });

    builder.addCase(
      fetchAllAuthors.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(fetchAllAuthors.fulfilled, (state, action) => {
      state.status = "fullfilled";
      state.allAuthors = action.payload;
    });

    builder.addCase(fetchAllAuthors.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });

    builder.addCase(
      fetchAuthor.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(fetchAuthor.fulfilled, (state, action) => {
      state.status = "fullfilled";
      state.author = action.payload;
    });

    builder.addCase(fetchAuthor.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });

    builder.addCase(
      updateAuthorAsync.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(updateAuthorAsync.fulfilled, (state, action) => {
      state.status = "fullfilled";
      state.author = action.payload;
    });

    builder.addCase(updateAuthorAsync.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });
  },
});

export default authorSlice;
