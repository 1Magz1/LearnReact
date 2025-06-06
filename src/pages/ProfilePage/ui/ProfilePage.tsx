import { useTranslation } from 'react-i18next';
import {
  profileReducer,
  getProfileData,
  fetchProfileData,
  ProfileEditForm,
  updateProfileData,
  UserProfile, ProfileFormData,
} from 'features/UserProfile';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { useSelector } from 'react-redux';
import { Loader } from 'widgets/Loader';
import { Text } from 'shared/ui/Text';
import { useReducerLoader } from 'shared/hooks';
import { PageError } from 'widgets/PageError';
import { ProfileCard } from 'widgets/ProfileCard';
import { Button } from 'shared/ui/Button';
import { ReducerObject } from 'app/providers/StoreProvider/config/stateSchema';
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

  const toggleEditing = () => setIsEditing((prev) => !prev);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      await dispatch(fetchProfileData()).unwrap();
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
    if (data === null) {
      fetchProfile().finally(() => {
        setIsLoading(false);
        setIsEditing(false);
      });
    }
  }, []);

  if (isError) {
    return (
      <PageError message={t('error')} />
    );
  }

  return (
    <>
      <div className={cls.header}>
        <Text variant="h1">
          {t('title')}
        </Text>
        <div>
          { !isLoading && !isError && (
            <Button onClick={toggleEditing}>
              {!isEditing ? t('edit') : t('cancel')}
            </Button>
          )}
        </div>
      </div>
      {!isLoading ? (
        <div className={cls.wrapper}>
          <div className={cls.wrap}>
            <ProfileCard
              profile={data}
              className={cls.card}
            />
          </div>

          {isEditing && data && (
            <div className={cls.wrap}>
              <ProfileEditForm
                profile={data}
                onSave={handleOnSave}
                onCancel={() => setIsEditing(false)}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      ) : (
        <Loader size={80} />
      )}
    </>
  );
}

export default ProfilePage;
