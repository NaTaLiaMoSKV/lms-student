import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { providesTags, LIST } from "utils/createApiUtils";

const Questions = "Questions";

export const questionsApi = createApi({
  reducerPath: "questions",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/questions`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [Questions],
  endpoints: (builder) => ({
    getLessonQuestions: builder.query({
      query: (id) => `../lessons/${id}/questions`,
      providesTags: (result) => providesTags(result, Questions),
    }),
    getQuestion: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: Questions, id }],
    }),
    addLessonQuestion: builder.mutation({
      query: ({ id, data }) => ({
        url: `../lessons/${id}/questions`,
        method: "POST",
        body: { data },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: Questions, id: LIST },
      ],
    }),
  }),
});

export const {
  useGetLessonQuestionsQuery,
  useGetQuestionQuery,
  useAddLessonQuestionMutation,
} = questionsApi;
