import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/api/greeting';
export const getGreeting = createAsyncThunk(
  'greeting',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  },
);

const initialState = {
  greeting: {},
  isLoading: true,
  error: false,
};

const greetingSlice = createSlice({
  name: 'greeting',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGreeting.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getGreeting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.greeting = action.payload || {};
    });
    builder.addCase(getGreeting.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default greetingSlice.reducer;
