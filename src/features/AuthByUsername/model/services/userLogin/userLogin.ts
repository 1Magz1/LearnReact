import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthSchema, UserLoginInfo } from 'features/AuthByUsername';
import ky from 'ky';
import { loginInfoActions } from 'features/AuthByUsername/model/slice/authSlice';

const URL = 'http://localhost:8000/login';

export const userLogin = createAsyncThunk(
  'login/userLogin',
  async (authData: AuthSchema, thunkAPI) => {
    const response = await ky.post<UserLoginInfo>(URL, { json: authData }).json();

    // localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
    thunkAPI.dispatch(loginInfoActions.setLoginInfoInfo(response));

    return response;
  },
);
