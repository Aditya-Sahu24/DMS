// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI } from './authAPI';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload: { userId: string; password: string }, thunkAPI) => {
    const response = await loginAPI(payload.userId, payload.password);
    if (response.isSuccess) {
      return response;
    } else {
      return thunkAPI.rejectWithValue(response.mesg);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    isAuthenticated: false,
    error: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(loginUser.fulfilled, state => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
