import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAcc = createAsyncThunk('acc/fetchAcc', async () => {
  const { data } = await axios.get('/accounts')
  return data;
});

const initialState = {
  accounts:{
    items: [],
    status: 'loading',
  }
}


const accSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAcc.pending]: (state) => {
      state.accounts.status = 'loading';
    },
    [fetchAcc.fulfilled]: (state, action) => {
      state.accounts.items = action.payload;
      state.accounts.status = 'loaded';
    },
    [fetchAcc.rejected]: (state) => {
      state.accounts.items = [];
      state.accounts.status = 'error';
    },

  }
});

export const accReducer = accSlice.reducer;