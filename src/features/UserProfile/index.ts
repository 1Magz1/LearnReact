import {
  UserProfile,
  UserProfileSchema,
  UserShema,
  ProfileFormData,
} from './model/schema/userProfileSchema';
import { profileActions, profileReducer } from './model/slice/profileSlice';
import { getProfileData } from './model/selectors/getProfileData/getProfileData';
import { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData';
import { updateProfileData } from './model/services/updateProfileData/updateProfileData';
import { ProfileEditForm } from './ui/ProfileEditForm/ProfileEditForm';

export {
  profileActions,
  profileReducer,
  getProfileData,
  fetchProfileData,
  ProfileEditForm,
  updateProfileData,
  UserProfile,
  UserProfileSchema,
  UserShema,
  ProfileFormData,
};
