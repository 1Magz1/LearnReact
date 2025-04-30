import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkExtraArg } from 'app/providers/StoreProvider';
import { UserProfile } from '../../schema/userProfileSchema';
import { profileActions } from '../../slice/profileSlice';

export const updateProfileData = createAsyncThunk<UserProfile, UserProfile, {extra: ThunkExtraArg}>(
  'profile/updateProfileData',
  async (data, thunkApi) => {
    const { extra, dispatch } = thunkApi;

    const response = await extra.api.post('profile', { json: data }).json<UserProfile>();
    dispatch(profileActions.setUserProfile(response));
    return response;
  },
);
