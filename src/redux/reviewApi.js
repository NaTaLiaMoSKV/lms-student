import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { strToDate } from "utils/dateUtils";

const transformReview = (review) => ({
  ...review,
  createdAt: strToDate(review.createdAt),
});

const Reviews = "Reviews";

export const reviewApi = createApi({
  reducerPath: "reviews",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [Reviews],
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => "auth/reviews",
      transformResponse: (response) => response.map(transformReview),
    }),
    createReview: builder.mutation({
      query: ({ ...body }) => ({
        url: `student/reviews`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetReviewsQuery, useCreateReviewMutation } = reviewApi;
