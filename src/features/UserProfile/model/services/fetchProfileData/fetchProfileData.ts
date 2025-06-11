import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkExtraArg } from 'app/providers/StoreProvider';
import { UserProfile } from '../../schema/userProfileSchema';

export const fetchProfileData = createAsyncThunk<UserProfile, string, {extra: ThunkExtraArg}>(
  'profile/fetchProfileData',
  async (profileId, thunkAPI) => {
    const { extra } = thunkAPI;

    const response = await extra.api.get(`profile/${profileId}`).json<UserProfile>();
    return response;
  },

);
