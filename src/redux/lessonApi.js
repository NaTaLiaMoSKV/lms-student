import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { strToDate } from "utils/dateUtils";

export const transformLesson = (lesson) => ({
  ...lesson,
  startsAt: strToDate(lesson.startsAt),
  startedAt: strToDate(lesson.startedAt),
  finishedAt: strToDate(lesson.finishedAt),
});

export const lessonApi = createApi({
  reducerPath: "lessons",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/lessons`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLessons: builder.query({
      query: () => "/",
      transformResponse: (response) => response.map(transformLesson),
    }),
    getLesson: builder.query({
      query: (id) => `/${id}`,
      transformResponse: (response) => transformLesson(response),
    }),
  }),
});

export const { useGetLessonsQuery, useGetLessonQuery } = lessonApi;
