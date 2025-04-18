import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfileData } from 'features/UserProfile/model/services/fetchProfileData/fetchProfileData';
import { UserProfile, UserProfileScheme } from '../types/userProfileScheme';

const initialState: UserProfileScheme = {
  data: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<UserProfile>) => {
      state.data = action.payload;
    });
  },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
