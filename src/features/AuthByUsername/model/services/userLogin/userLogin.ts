import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkExtraArg } from 'app/providers/StoreProvider';
import { authActions } from '../../slice/authSlice';
import { AuthSchema, AuthInfoSchema } from '../../schema/authInfoSchema';

export const userLogin = createAsyncThunk<AuthInfoSchema, AuthSchema, { rejectValue: string, extra: ThunkExtraArg }>(
  'login/userLogin',
  async (authData, thunkAPI) => {
    const response = await thunkAPI.extra.api.post('login', { json: authData }).json<AuthInfoSchema>();
    thunkAPI.dispatch(authActions.setAuthInfo(response));

    return response;
  },
);
