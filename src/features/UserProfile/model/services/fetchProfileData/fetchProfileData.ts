import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserProfile } from 'features/UserProfile/model/types/userProfileScheme';
import { ThunkExtraArg } from 'app/providers/StoreProvider/config/stateSchema';
import { profileActions } from 'features/UserProfile/model/slice/profileSlice';

export const fetchProfileData = createAsyncThunk<UserProfile, void, {extra: ThunkExtraArg}>(
  'profile/fetchProfileData',
  async (_, thunkAPI) => {
    const { extra, dispatch } = thunkAPI;

    const response = await extra.api.get('profile').json<UserProfile>();

    dispatch(profileActions.setUserProfile(response));

    return response;
  },

);
