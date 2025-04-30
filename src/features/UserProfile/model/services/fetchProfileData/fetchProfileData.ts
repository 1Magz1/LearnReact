import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkExtraArg } from 'app/providers/StoreProvider';
import { UserProfile } from '../../schema/userProfileSchema';
import { profileActions } from '../../slice/profileSlice';

export const fetchProfileData = createAsyncThunk<UserProfile, void, {extra: ThunkExtraArg}>(
  'profile/fetchProfileData',
  async (_, thunkAPI) => {
    const { extra, dispatch } = thunkAPI;

    const response = await extra.api.get('profile').json<UserProfile>();

    dispatch(profileActions.setUserProfile(response));

    return response;
  },

);
