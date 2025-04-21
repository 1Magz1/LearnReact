import { ProfileEditForm } from 'features/UserProfile/ui/ProfileEditForm';
import { UserProfileScheme } from './model/types/userProfileScheme';
import { profileActions, profileReducer } from './model/slice/profileSlice';
import { getProfileData } from './model/selectors/getProfileData/getProfileData';
import { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData';

export {
  profileActions,
  profileReducer,
  UserProfileScheme,
  getProfileData,
  fetchProfileData,
  ProfileEditForm,
};
