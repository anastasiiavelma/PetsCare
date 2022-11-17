import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAcc = createAsyncThunk('accounts/fetchAcc', async (params) => {
  const { data } = await axios.post('/accounts', params)
  return data;

});

const initialState = {
  data: [],
  status: 'loading',
}

const accSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAcc.pending]: (state) => {
      state.account.status = 'loading';
      state.account.data = null;
    },
    [fetchAcc.fulfilled]: (state, action) => {
      state.account.status = 'loaded';
      state.account.data = action.payload;
    },
    [fetchAcc.rejected]: (state) => {
      state.account.status = 'error';
      state.account.data = null;
    },

  }
});

export const accounts = (state) => state.account.data;

export const accReducer = accSlice.reducer;