import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SHOW_SUCCESS_MESSAGE: false,
  SHOW_ERROR_MESSAGE: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showMessage: (state, { payload }) => {
      state.SHOW_SUCCESS_MESSAGE = payload;
      state.SHOW_ERROR_MESSAGE = false;
    },
    showError: (state, { payload }) => {
      state.SHOW_SUCCESS_MESSAGE = false;
      state.SHOW_ERROR_MESSAGE = payload;
    },
    clearMessages: (state) => {
      state.SHOW_ERROR_MESSAGE = false;
      state.SHOW_SUCCESS_MESSAGE = false;
    },
  },
  extraReducers: {},
});

export const { showError, showMessage, clearMessages } = alertSlice.actions;
export default alertSlice.reducer;
