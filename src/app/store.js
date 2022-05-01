import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Features/auth/authSlice";
import AlertReducer from "../Features/alert/alertSlice";
import logger from "redux-logger";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    alert: AlertReducer,
  },
  middleware: [thunk, logger],
});
