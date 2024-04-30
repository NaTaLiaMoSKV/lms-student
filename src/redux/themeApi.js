import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const themeApi = createApi({
  reducerPath: "themes",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/themes`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTheme: builder.query({
      query: (id) => `/${id}`,
    }),
    getThemeContent: builder.query({
      query: (id) => `/${id}/content`,
    }),
    getThemeHomework: builder.query({
      query: (id) => `/${id}/homework`,
    }),
  }),
});

export const {
  useGetThemeQuery,
  useGetThemeContentQuery,
  useGetThemeHomeworkQuery,
} = themeApi;
