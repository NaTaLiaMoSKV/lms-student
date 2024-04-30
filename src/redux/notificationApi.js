import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { strToDate } from "utils/dateUtils";
import { providesTags } from "utils/createApiUtils";

export const transformNotification = (notification) => ({
  ...notification,
  createdAt: strToDate(notification.createdAt),
});

const Notifications = "Notifications";
const NotificationsStat = "NotificationsStat";

export const notificationApi = createApi({
  reducerPath: "notifications",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/users/notifications`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [Notifications, NotificationsStat],
  endpoints: (builder) => ({
    getNotificationsStat: builder.query({
      query: () => `/stat`,
      providesTags: [NotificationsStat],
    }),
    getNotifications: builder.query({
      query: (page = 1) => `/?page=${page}`,
      providesTags: (result) => providesTags(result, Notifications),
      transformResponse: (response) => response.map(transformNotification),
    }),
    getNotification: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: Notifications, id }],
      transformResponse: (response) => transformNotification(response),
    }),
    setNotificationViewed: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => [
        { type: Notifications, id },
        { type: NotificationsStat },
      ],
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: Notifications, id }],
    }),
  }),
});

export const {
  useGetNotificationsStatQuery,
  useGetNotificationsQuery,
  useGetNotificationQuery,
  useSetNotificationViewedMutation,
  useDeleteNotificationMutation,
} = notificationApi;
