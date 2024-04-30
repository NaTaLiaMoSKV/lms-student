import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/users`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/`, method: "PUT", body }),
    }),
    uploadImage: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return { url: `/image`, method: "POST", body: formData };
      },
    }),
    getUnauthorizedCourses: builder.query({
      query: () => `../../auth/courses`,
    }),
    commitUploadedImage: builder.mutation({
      query: (image) => ({
        url: `/image/commit`,
        method: "POST",
        body: { image },
      }),
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useUploadImageMutation,
  useGetUnauthorizedCoursesQuery,
  useCommitUploadedImageMutation,
} = userApi;
