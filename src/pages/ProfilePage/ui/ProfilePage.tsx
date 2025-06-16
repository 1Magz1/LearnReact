import { useTranslation } from 'react-i18next';
import {
  profileReducer,
  getProfileData,
  fetchProfileData,
  ProfileEditForm,
  updateProfileData,
  ProfileFormData,
} from 'features/UserProfile';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { useSelector } from 'react-redux';
import { Loader } from 'widgets/Loader';
import { Text } from 'shared/ui/Text';
import { useLocalStorage, useReducerLoader } from 'shared/hooks';
import { PageError } from 'widgets/PageError';
import { ProfileCard } from 'widgets/ProfileCard';
import { Button } from 'shared/ui/Button';
import { ReducerObject } from 'app/providers/StoreProvider/config/stateSchema';
import { useParams } from 'react-router-dom';
import { LOCAL_STORAGE_USERNAME_ID_KEY, LOCAL_STORAGE_USERNAME_KEY } from 'shared/constants';
import { Box } from 'shared/ui/Box';
import { classNames } from 'shared/lib/classNames/classNames';
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
  const [isError, setIsError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const data = useSelector(getProfileData);
  const { id } = useParams();
  const [userId] = useLocalStorage(LOCAL_STORAGE_USERNAME_ID_KEY, '');

  const toggleEditing = () => setIsEditing((prev) => !prev);

  const fetchProfile = useCallback(async (id: string) => {
    try {
      await dispatch(fetchProfileData(id)).unwrap();
    } catch (error) {
      setIsError(true);
    }
  }, [dispatch]);

  const handleOnSave = useCallback(async (profile: ProfileFormData) => {
    try {
      setIsLoading(true);
      await dispatch(updateProfileData(profile)).unwrap();
    } catch (error) {
      setIsError(true);
      setIsEditing(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      setIsError(false);

      fetchProfile(id).finally(() => {
        setIsLoading(false);
        setIsEditing(false);
      });
    }
  }, [id]);

  if (isError) {
    return (
      <PageError message={t('error')} />
    );
  }

  return (
    <div className="page-wrapper">
      <Box direction="row" justifyContent="space-between" alignItems="baseline">
        <Text variant="h1">
          {t('title')}
        </Text>
        { !isLoading && !isError && id === userId && (
        <Button onClick={toggleEditing}>
          {!isEditing ? t('edit') : t('cancel')}
        </Button>
        )}
      </Box>
      {!isLoading ? (
        <Box direction="row" justifyContent="space-between">
          <ProfileCard
            profile={data}
            className={classNames(cls.card, {}, [cls.wrap])}
          />

          {isEditing && data && (
            <ProfileEditForm
              className={cls.wrap}
              profile={data}
              onSave={handleOnSave}
              onCancel={() => setIsEditing(false)}
              isLoading={isLoading}
            />
          )}
        </Box>
      ) : (
        <Loader size={80} />
      )}
    </div>
  );
}

export default ProfilePage;
