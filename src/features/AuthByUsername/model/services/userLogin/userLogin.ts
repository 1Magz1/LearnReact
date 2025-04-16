import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthSchema, AuthInfoSchema } from 'features/AuthByUsername';
import ky from 'ky';
import { authActions } from 'features/AuthByUsername/model/slice/authSlice';

export const URL = 'http://localhost:8000/login';

export const userLogin = createAsyncThunk<AuthInfoSchema, AuthSchema, { rejectValue: string }>(
  'login/userLogin',
  async (authData, thunkAPI) => {
    const response = await ky.post<AuthInfoSchema>(URL, { json: authData }).json();
    thunkAPI.dispatch(authActions.setAuthInfo(response));
    return response as AuthInfoSchema;
  },
);
