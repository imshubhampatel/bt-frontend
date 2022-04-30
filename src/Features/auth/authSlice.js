import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Axios";
import { Authenticate } from "../../Helpers/auth.helper";

const setUserDetails = createAsyncThunk(
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
      Authenticate(data, function () {
        console.log("created");
      });
      return data;
    } catch (error) {
      console.log(error.response.data);
      return error.response.data;
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
    _clear: (state, payload) => {
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
    [setUserDetails.rejected]: (state, payload) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.isLoggedIn = false;
      state.success = false;
      state.error = payload;
    },
  },
});

export { setUserDetails };
export default authSlice.reducer;
