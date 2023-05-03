import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async ({ username, password }) => {
  const response = await axios.post('/login/', { username, password });
  return response.data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await axios.post('/logout/');
  return response.data;
});

export const register = createAsyncThunk('auth/register', async ({ username, email, password, first_name, last_name }) => {
  const response = await axios.post('/register/', { username, email, password, first_name, last_name  });
  return response.data;
});

export const checkUserLoggedIn = createAsyncThunk('auth/checkUserLoggedIn', async () => {
  const response = await axios.get('/check_user_logged_in/');
  return response.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
    status: 'idle',
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(checkUserLoggedIn.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(checkUserLoggedIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(checkUserLoggedIn.rejected, (state) => {
        state.status = 'succeeded';
        state.user = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      });
  },
});







