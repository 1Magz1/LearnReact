import { ProfileEditForm } from 'features/UserProfile/ui/ProfileEditForm';
import { UserProfile, UserProfileSchema } from './model/schema/userProfileSchema';
import { profileActions, profileReducer } from './model/slice/profileSlice';
import { getProfileData } from './model/selectors/getProfileData/getProfileData';
import { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData';
import { updateProfileData } from './model/services/updateProfileData/updateProfileData';

export {
  profileActions,
  profileReducer,
  getProfileData,
  fetchProfileData,
  ProfileEditForm,
  updateProfileData,
  UserProfile,
  UserProfileSchema,
};
