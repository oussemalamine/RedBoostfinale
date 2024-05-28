// entrepreneursSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../../axiosInstance';

export const loadEntrepreneurs = createAsyncThunk(
  'entrepreneurs/loadEntrepreneurs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/loadAllentrepreneurs');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const entrepreneursSlice = createSlice({
  name: 'entrepreneurs',
  initialState: {
    entrepreneurs: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadEntrepreneurs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadEntrepreneurs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entrepreneurs = action.payload;
      })
      .addCase(loadEntrepreneurs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default entrepreneursSlice.reducer;
