import { useTranslation } from 'react-i18next';
import DynamicReducerLoader, { ReducerObject } from 'shared/lib/components/DynamicReducerLoader/DynamicReducerLoader';
import {
  profileReducer, getProfileData, ProfileCard, fetchProfileData,
} from 'features/UserProfile';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { useSelector } from 'react-redux';
import { Loader } from 'widgets/Loader';
import Text from 'widgets/Text/Text';
import cls from './ProfilePage.module.scss';

const reducerList: ReducerObject[] = [
  {
    name: 'profile',
    reducer: profileReducer,
  },
];

function ProfilePage() {
  const { t } = useTranslation('profile');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const profileData = useSelector(getProfileData);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(fetchProfileData());
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProfile().finally(() => setIsLoading(false));
  }, []);

  return (
    <DynamicReducerLoader reducerList={reducerList}>
      <Text variant="h1">
        {t('title')}
      </Text>
      {!isLoading ? (
        <ProfileCard profile={profileData} className={cls.card} />
      ) : (
        <Loader />
      )}
    </DynamicReducerLoader>
  );
}

export default ProfilePage;
