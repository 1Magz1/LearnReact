import { useTranslation } from 'react-i18next';
import {
  profileReducer, getProfileData, fetchProfileData, ProfileEditForm,
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
import { PageError } from 'widgets/PageError';
import { ProfileCard } from 'widgets/ProfileCard';
import log from 'eslint-plugin-react/lib/util/log';
import { Button } from 'shared/ui/Button';
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
  const navigation = useNavigate();
  const [userName] = useLocalStorage(LOCAL_STORAGE_USERNAME_KEY, '');

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      await dispatch(fetchProfileData()).unwrap();
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const handleOnSave = () => {
    console.log('handleOnSave');
  };

  const handleOnCancel = () => {
    console.log('handleOnCancel');
  };

  useEffect(() => {
    if (userName.length > 0 && data === null) {
      fetchProfile().finally(() => setIsLoading(false));
    } else if (userName.length === 0 && data === null) {
      navigation('/');
    }
  }, [userName]);

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
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
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

          {isEditing && (
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
        <Loader />
      )}
    </>
  );
}

export default ProfilePage;
