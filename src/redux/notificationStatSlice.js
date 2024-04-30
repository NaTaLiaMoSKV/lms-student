import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  total: 0,
  unviewed: 0,
  pages: 0,
  isInitialized: false,
};

export const notificationStatSlice = createSlice({
  name: "notificationStat",
  initialState,
  reducers: {
    updateNotificationStat: (state, action) => {
      const { total, unviewed, pages } = action.payload;
      if (state.unviewed < unviewed && state.isInitialized) {
        toast.info("New notification");
      }

      state.total = total;
      state.unviewed = unviewed;
      state.pages = pages;

      if (!state.isInitialized) {
        state.isInitialized = true;
      }
    },
  },
});

export const notificationStatReducer = notificationStatSlice.reducer;

export const { updateNotificationStat } = notificationStatSlice.actions;

export const selectNotificationStat = (state) => state.notificationStat;
