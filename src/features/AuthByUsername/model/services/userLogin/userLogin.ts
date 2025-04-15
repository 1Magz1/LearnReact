import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthSchema, AuthInfoSchema } from 'features/AuthByUsername';
import ky from 'ky';
import { authSliceActions } from 'features/AuthByUsername/model/slice/authSlice';

const URL = 'http://localhost:8000/login';

export const userLogin = createAsyncThunk(
  'login/userLogin',
  async (authData: AuthSchema, thunkAPI) => {
    const response = await ky.post<AuthInfoSchema>(URL, { json: authData }).json();

    thunkAPI.dispatch(authSliceActions.setLoginInfoInfo(response));

    return response;
  },
);
