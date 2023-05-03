import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { authSlice } from '../features/auth/authSlice';
import dataSlice from '../features/data/dataSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice,
    data: dataSlice,

  },
});
