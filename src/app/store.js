import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
