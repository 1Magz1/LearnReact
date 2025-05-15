import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkExtraArg } from 'app/providers/StoreProvider';
import { UserProfile } from '../../schema/userProfileSchema';

export const fetchProfileData = createAsyncThunk<UserProfile, void, {extra: ThunkExtraArg}>(
  'profile/fetchProfileData',
  async (_, thunkAPI) => {
    const { extra } = thunkAPI;

    const response = await extra.api.get('profile').json<UserProfile>();
    return response;
  },

);
