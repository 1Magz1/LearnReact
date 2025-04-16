import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthSchema, AuthInfoSchema } from 'features/AuthByUsername';
import ky from 'ky';
import { authActions } from 'features/AuthByUsername/model/slice/authSlice';

export const URL = 'http://localhost:8000/login';

export const userLogin = createAsyncThunk<AuthInfoSchema, AuthSchema, { rejectValue: string }>(
  'login/userLogin',
  async (authData, thunkAPI) => {
    try {
      const response = await ky.post(URL, { json: authData }).json<AuthInfoSchema>();
      thunkAPI.dispatch(authActions.setAuthInfo(response));
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue('Login error');
    }
  },
);
