import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { strToDate } from "utils/dateUtils";

const transformGroup = (group) => ({
  ...group,
  startsAfter: new Date(group.startsAfter),
  startedAt: strToDate(group.startedAt),
  finishedAt: strToDate(group.finishedAt),
});

export const transformLesson = (lesson) => ({
  ...lesson,
  startsAt: new Date(lesson.startsAt),
});

export const groupApi = createApi({
  reducerPath: "groups",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/groups`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getStudentGroups: builder.query({
      query: () => "/",
      transformResponse: (response) => response.map(transformGroup),
    }),
    getGroup: builder.query({
      query: (id) => `/${id}`,
      transformResponse: (response) => transformGroup(response),
    }),
    getGroupLessons: builder.query({
      query: (id) => `/${id}/lessons`,
      transformResponse: (response) => response.map(transformLesson),
    }),
  }),
});

export const {
  useGetStudentGroupsQuery,
  useGetGroupQuery,
  useGetGroupLessonsQuery,
} = groupApi;
