import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { strToDate } from "utils/dateUtils";

export const transformHomework = (homework) => ({
  ...homework,
  approved: strToDate(homework.approved),
  messages: homework.messages.map((message) => ({
    ...message,
    createdAt: strToDate(message.createdAt),
  })),
});

const Homeworks = "Homeworks";

export const homeworkApi = createApi({
  reducerPath: "homeworks",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/homeworks`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [Homeworks],
  endpoints: (builder) => ({
    getLessonHomework: builder.query({
      query: (id) => `../lessons/${id}/homework`,
      providesTags: (result, error, id) => [{ type: Homeworks, id }],
      transformResponse: (response) => transformHomework(response),
    }),
    addHomeworkMessage: builder.mutation({
      query: ({ id, text }) => ({
        url: `/${id}/messages`,
        method: "POST",
        body: { data: text },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: Homeworks, id }],
    }),
  }),
});

export const { useGetLessonHomeworkQuery, useAddHomeworkMessageMutation } =
  homeworkApi;
