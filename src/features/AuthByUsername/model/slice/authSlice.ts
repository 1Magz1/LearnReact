import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_USERNAME_KEY, STORAGE_EVENT } from 'shared/constants';
import { AuthInfoSchema } from '../schema/authInfoSchema';
import { userLogin } from '../services/userLogin/userLogin';

const initialState: AuthInfoSchema = {
  username: '',
  id: -1,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthInfo: (state, action: PayloadAction<AuthInfoSchema>) => {
      state.username = action.payload.username;
      state.id = action.payload.id;
      localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, JSON.stringify(action.payload.username));
      window.dispatchEvent(new Event(STORAGE_EVENT));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.id = action.payload.id;
      });
  },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
