import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { UserProfile, UserProfileSchema } from '../schema/userProfileSchema';

const initialState: UserProfileSchema = {
  data: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<UserProfile>) => {
      state.data = action.payload;
    });
    builder.addCase(updateProfileData.fulfilled, (state, action: PayloadAction<UserProfile>) => {
      state.data = action.payload;
    });
  },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
