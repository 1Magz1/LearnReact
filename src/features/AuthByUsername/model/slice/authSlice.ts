import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthInfoSchema } from '../types/authInfoSchema';
import { userLogin } from '../services/userLogin/userLogin';

const initialState: AuthInfoSchema = {
  username: '',
  id: -1,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginInfoInfo: (state, action: PayloadAction<AuthInfoSchema>) => {
      state.username = action.payload.username;
      state.id = action.payload.id;
      localStorage.setItem('USER_NAME', JSON.stringify(action.payload.username));
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
