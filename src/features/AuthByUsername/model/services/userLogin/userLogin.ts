import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthSchema, AuthInfoSchema } from 'features/AuthByUsername';
import { authActions } from 'features/AuthByUsername/model/slice/authSlice';
import { ThunkExtraArg } from 'app/providers/StoreProvider/config/stateSchema';

export const userLogin = createAsyncThunk<AuthInfoSchema, AuthSchema, { rejectValue: string, extra: ThunkExtraArg }>(
  'login/userLogin',
  async (authData, thunkAPI) => {
    const response = await thunkAPI.extra.api.post('login', { json: authData }).json<AuthInfoSchema>();
    thunkAPI.dispatch(authActions.setAuthInfo(response));

    return response;
  },
);
