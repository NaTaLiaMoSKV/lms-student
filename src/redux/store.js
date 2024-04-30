import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./authSlice";
import { themeApi } from "./themeApi";
import { homeworkApi } from "./homeworkApi";
import { questionsApi } from "./questionsApi";
import { notificationApi } from "./notificationApi";
import { reviewApi } from "./reviewApi";
import { groupApi } from "./groupApi";
import { userApi } from "./userApi";
import { lessonApi } from "./lessonApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { notificationStatReducer } from "./notificationStatSlice";

const authConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const authPersistedReducer = persistReducer(authConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
    [themeApi.reducerPath]: themeApi.reducer,
    [homeworkApi.reducerPath]: homeworkApi.reducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer,
    [lessonApi.reducerPath]: lessonApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    notificationStat: notificationStatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      themeApi.middleware,
      homeworkApi.middleware,
      questionsApi.middleware,
      notificationApi.middleware,
      reviewApi.middleware,
      groupApi.middleware,
      userApi.middleware,
      lessonApi.middleware
    ),
  devTools: process.env.NODE_ENV === "development",
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
