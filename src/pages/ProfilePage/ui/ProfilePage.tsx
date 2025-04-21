import { useTranslation } from 'react-i18next';
import {
  profileReducer, getProfileData, ProfileCard, fetchProfileData,
} from 'features/UserProfile';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { useSelector } from 'react-redux';
import { Loader } from 'widgets/Loader';
import Text from 'widgets/Text/Text';
import useReducerLoader, { ReducerObject } from 'shared/hooks/useReducerLoader';
import { LOCAL_STORAGE_USERNAME_KEY } from 'shared/constants';
import { useNavigate } from 'react-router';
import { useLocalStorage } from 'shared/hooks/useLocalStorage';
import cls from './ProfilePage.module.scss';

const reducerList: ReducerObject[] = [
  {
    name: 'profile',
    reducer: profileReducer,
  },
];

function ProfilePage() {
  useReducerLoader(reducerList);
  const { t } = useTranslation('profile');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const profileData = useSelector(getProfileData);
  const navigation = useNavigate();
  const [userName] = useLocalStorage(LOCAL_STORAGE_USERNAME_KEY, '');

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(fetchProfileData());
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (userName.length) {
      fetchProfile().finally(() => setIsLoading(false));
    } else {
      navigation('/');
    }
  }, [userName]);

  return (
    <>
      <Text variant="h1">
        {t('title')}
      </Text>
      {!isLoading ? (
        <ProfileCard profile={profileData} className={cls.card} />
      ) : (
        <Loader />
      )}
    </>
  );
}

export default ProfilePage;
