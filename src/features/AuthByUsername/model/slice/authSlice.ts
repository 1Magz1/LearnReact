import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginInfoSchema, UserLoginInfo } from '../types/loginInfoSchema';
import { userLogin } from '../services/userLogin/userLogin';

const initialState: LoginInfoSchema = {
  username: '',
  id: -1,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginInfoInfo: (state, action: PayloadAction<UserLoginInfo>) => {
      state.username = action.payload.username;
      state.id = action.payload.id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.username = action.payload.username;
        state.id = action.payload.id;
      });
  },
});

export const { actions: loginInfoActions } = authSlice;
export const { reducer: loginInfoReducer } = authSlice;
