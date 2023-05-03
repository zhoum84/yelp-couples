import axios from 'axios';
import { login, logout, register, checkUserLoggedIn } from './authSlice';

export const authServices = {
  login: ({ username, password }) =>
    login({ username, password }, { thunkAPI: { client: axios } }).then((response) => {
      localStorage.setItem('user', JSON.stringify(response.payload));
      return response;
    }),
  logout: () =>
    logout({ thunkAPI: { client: axios } }).then(() => {
      localStorage.removeItem('user');
    }),
  register: ({ username, email, password, first_name, last_name  }) =>
    register({ username, email, password, first_name, last_name  }, { thunkAPI: { client: axios } }),
  checkUserLoggedIn: () =>
    checkUserLoggedIn({ thunkAPI: { client: axios } }),
};

