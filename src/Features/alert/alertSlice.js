import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: false,
  successMessage: false,
  errorMessage: false,
  loading: false,
  success: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default authSlice.reducer;
