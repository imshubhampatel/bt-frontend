import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import AuthReducer from "../Features/auth/authSlice";
import AlertReducer from "../Features/alert/alertSlice";
import NewsReducer from "../Features/news/newsSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    alert: AlertReducer,
    news: NewsReducer,
  },
  middleware: [thunk, logger],
});
