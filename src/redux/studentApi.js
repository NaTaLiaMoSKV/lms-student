import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
  reducerPath: "students",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/students`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/",
    }),
    getStudent: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetStudentsQuery, useGetStudentQuery } = studentApi;
