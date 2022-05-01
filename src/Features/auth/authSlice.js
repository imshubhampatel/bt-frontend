import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Axios";
import { Authenticate } from "../../Helpers/auth.helper";
import { showMessage } from "../alert/alertSlice";

export const setUserDetails = createAsyncThunk(
  "users/setUserDetails",
  async (values, thunkAPI) => {
    alert(JSON.stringify(values));
    try {
      let config = {
        method: "post",
        url: "/super-admin/sign-in",
        data: values,
      };
      let { data } = await axios(config);
      console.log(data);

      Authenticate(data, function () {
        console.log("created");
        thunkAPI.dispatch(showMessage(data.data.message));
        setTimeout(() => {
          thunkAPI.dispatch(clearErrorAndSuccess());
        }, 2000);
      });
      return data;
    } catch (error) {
      console.log(error.response.data.data);
      setTimeout(() => {
        thunkAPI.dispatch(clearErrorAndSuccess());
      }, 2000);
      return thunkAPI.rejectWithValue(error.response.data.data);
    }
  }
);

const initialState = {
  isLoggedIn: false,
  token: false,
  isAuthenticated: false,
  loading: false,
  success: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload);
    },
    clearErrorAndSuccess: (state, payload) => {
      state.success = false;
      state.error = false;
    },
  },
  extraReducers: {
    [setUserDetails.pending]: (state) => {
      state.loading = true;
    },
    [setUserDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.isLoggedIn = true;
      state.token = payload.data.token;
      state.success = true;
    },
    [setUserDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.isLoggedIn = false;
      state.success = false;
      state.error = true;
    },
  },
});

export const { clearErrorAndSuccess } = authSlice.actions;
export default authSlice.reducer;
