import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserProfile } from 'features/UserProfile/model/types/userProfileScheme';
import { ThunkExtraArg } from 'app/providers/StoreProvider/config/stateSchema';
import { profileActions } from 'features/UserProfile';

export const updateProfileData = createAsyncThunk<UserProfile, UserProfile, {extra: ThunkExtraArg}>(
  'profile/updateProfileData',
  async (data, thunkApi) => {
    const { extra, dispatch } = thunkApi;

    const response = await extra.api.post('profile', { json: data }).json<UserProfile>();
    dispatch(profileActions.setUserProfile(response));
    return response;
  },
);
