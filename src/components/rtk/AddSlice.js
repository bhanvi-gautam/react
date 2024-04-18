import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./app/api";
const postsAdapter = createEntityAdapter();
const userToken = localStorage.getItem("token");

const initialState = postsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: { ...credentials },
      }),
      transformErrorResponse: (response) => {
        response = "Invalid Credentials";
        return response;
      },
      providesTags: (result, error, arg) => [
        { type: "User", id: "LIST" },
        ...result.ids.map((id) => ({ type: "User", id })),
      ],
    }),

    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",

        body: credentials,
      }),
    }),

    verifyStudent: builder.mutation({
      query: (requestData) => ({
        url: "/user/student-exists",
        method: "POST",
        body: requestData,
      }),
    }),

    verifyEmail: builder.mutation({
      query: (requestData) => ({
        url: "/auth/email-exists",
        method: "POST",
        body: { email: requestData },
      }),
    }),

    verifyPassword: builder.mutation({
      query: (requestData) => ({
        url: "/auth/password-exists",
        method: "POST",
        body: requestData,
      }),
    }),

    changePassword: builder.mutation({
      query: (requestData) => ({
        url: "/auth/new-password",
        method: "POST",
        body: requestData,
      }),
    }),

    getOnePost: builder.mutation({
      query: (requestData) => ({
        url: "/lms/getonepost",

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: requestData,
      }),
      transformResponse: (responseData) => {
        return responseData;
      },
      providesTags: (result, error, arg) => [
        { type: "Post", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Post", id })),
      ],
    }),

    getOneUser: builder.mutation({
      query: (requestData) => ({
        url: "/user/getUser",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ requestData }),
      }),
      transformResponse: (responseData) => {
        // console.log("response==", responseData)
        return responseData;
      },
      providesTags: (result, error, arg) => [
        { type: "User", id: "LIST" },
        ...result.ids.map((id) => ({ type: "User", id })),
      ],
    }),

    getPosts: builder.mutation({
      query: (requestData) => ({
        url: "/todo/get-todos",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        method: "POST",
        body: requestData,
      }),
      transformResponse: (responseData) => {
        // console.log("responseforgetAll==", responseData)
        return responseData;
      },
      onError: (error) => {
        // console.error("Error from useGetPostsMutation:", error);
      },
      providesTags: (result, error, arg) => [
        { type: "Post", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Post", id })),
      ],
    }),

    addNewPost: builder.mutation({
      query: (requestData) => ({
        url: "/todo/create-todo",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["Post"],
    }),

    updatePost: builder.mutation({
      query: (requestData) => ({
        url: "/todo/update-todo",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: requestData,
      }),
      transformResponse: (responseData) => {
        // console.log('responseData', responseData);
      },
      invalidatesTags: ["Post"],
    }),

    updateUser: builder.mutation({
      query: (requestData) => ({
        url: "/user/update-user",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: requestData,
      }),
      transformResponse: (responseData) => {
        // console.log('responseData', responseData);
      },
      invalidatesTags: ["User"],
    }),

    deletePost: builder.mutation({
      query: (requestData) => ({
        url: "/todo/delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        method: "POST",
        body: requestData,
      }),
    }),

    deleteUser: builder.mutation({
      query: (requestData) => ({
        url: "/user/deleteUser",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        method: "POST",
        body: requestData,
      }),
    }),
  }),
});

export const {
  useGetOnePostMutation,
  useDeletePostMutation,
  useGetPostsMutation,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useLoginMutation,
  useRegisterMutation,
  useDeleteUserMutation,
  useGetOneUserMutation,
  useUpdateUserMutation,
  useVerifyEmailMutation,
  useChangePasswordMutation,
  useVerifyPasswordMutation,
  useVerifyStudentMutation,
} = extendedApiSlice;
