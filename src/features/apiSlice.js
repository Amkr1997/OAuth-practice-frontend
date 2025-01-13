import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = import.meta.env.VITE_SERVER_URL;
import Cookies from "js-cookie";

const apiSlice = createApi({
  reducerPath: "apiSlice",
  tagTypes: ["GetAllTodos"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: (headers, { endpoint }) => {
      const googleAccessToken = Cookies.get("googleTodo_access_token") || "";

      const protectedRoutes = ["getInfo"];

      if (googleAccessToken && protectedRoutes.includes(endpoint)) {
        headers.set("Authorization", `Bearer ${googleAccessToken}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => {
    return {
      // Author Endpoints
      getInfo: builder.query({
        query: () => {
          return {
            url: "https://www.googleapis.com/oauth2/v2/userinfo",
            method: "GET",
          };
        },
      }),

      getProfile: builder.query({
        query: () => {
          return {
            url: "/user/profile/google",
            method: "GET",
            credentials: "include",
          };
        },
      }),

      addAuthor: builder.mutation({
        query: (authorData) => {
          return {
            url: "/add/author",
            method: "POST",
            body: authorData,
          };
        },
      }),

      updateAuthor: builder.mutation({
        query: (dataToUpdate) => {
          return {
            url: `/update/author/${dataToUpdate._id}`,
            method: "POST",
            body: dataToUpdate,
          };
        },
      }),

      getAuthor: builder.query({
        query: (googleId) => {
          return {
            url: `/get/author/${googleId}`,
            method: "GET",
          };
        },

        transformResponse: (data) => {
          return data?.singleAuthor;
        },
      }),

      getAllAuthors: builder.query({
        query: () => {
          return {
            url: `/get/authors`,
            method: "GET",
          };
        },
      }),

      // Todo Endpoints
      getAllTodos: builder.query({
        query: () => {
          return {
            url: "/get/todos",
            method: "GET",
          };
        },

        providesTags: ["GetAllTodos"],
      }),

      addTodo: builder.mutation({
        query: (todoData) => {
          return {
            url: `/add/todo`,
            method: "POST",
            body: todoData,
          };
        },

        invalidatesTags: ["GetAllTodos"],
      }),

      deleteTodo: builder.mutation({
        query: (todoId) => {
          return {
            url: `/delete/todo/${todoId}`,
            method: "DELETE",
          };
        },

        invalidatesTags: ["GetAllTodos"],
      }),
    };
  },
});

export const {
  useGetInfoQuery,
  useGetProfileQuery,
  useAddAuthorMutation,
  useGetAuthorQuery,
  useGetAllAuthorsQuery,
  useGetAllTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateAuthorMutation,
} = apiSlice;

export default apiSlice;
