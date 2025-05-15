import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkExtraArg } from 'app/providers/StoreProvider';
import { ProfileFormData, UserProfile } from '../../schema/userProfileSchema';

export const updateProfileData = createAsyncThunk<UserProfile, ProfileFormData, {extra: ThunkExtraArg}>(
  'profile/updateProfileData',
  async (data, thunkApi) => {
    const { extra } = thunkApi;

    const response = await extra.api.post('profile', { json: data }).json<UserProfile>();
    return response;
  },
);
