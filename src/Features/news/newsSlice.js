import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Axios";
export const getAllnewses = createAsyncThunk(
  "super-admin/get-all-news",
  async (token, thunkAPI) => {
    // alert(token);
    const config = {
      method: "get",
      url: `news/all-news`,
    };

    try {
      let { data } = await axios(config);
      // alert(JSON.stringify(data.data));
      return data.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data.data);
    }
  }
);

const initialState = {
  loading: false,
  success: false,
  error: false,
  selectedNews: [],
  selectedNewses: [],
  allNews: [],
  page: 1,
  totalPages: null,
  activeNews: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getAllnewses.pending]: (state) => {
      state.loading = true;
    },
    [getAllnewses.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allNews = payload.allNews;
    },
    [getAllnewses.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export default newsSlice.reducer;
