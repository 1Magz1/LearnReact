import { memo, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { THEME_BUTTON } from 'shared/ui/Button/ui/Button';
import { Select } from 'shared/ui/Select';
import { useTranslation } from 'react-i18next';
import Avatar from 'widgets/Avatar/ui/Avatar';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import i18n from 'i18next';
import {
  Currency,
  UserProfile,
  userProfileSchema,
  ProfileFormData,
} from '../model/schema/userProfileSchema';
import cls from './ProfileEditForm.module.scss';

interface ProfileEditFormProps {
  profile: UserProfile;
  onSave: (profile: ProfileFormData) => void;
  onCancel: () => void;
  className?: string;
  isLoading?: boolean;
}

const currencyList = Object.keys(Currency).map((key) => ({
  value: key,
  content: key,
}));

export const ProfileEditForm = memo(({
  profile,
  onSave,
  onCancel,
  className = '',
  isLoading,
}: ProfileEditFormProps) => {
  const { t } = useTranslation('profile');
  const {
    control, handleSubmit, formState: { errors }, trigger,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      avatar: profile.avatar,
      username: profile.username,
      firstname: profile.firstname,
      lastname: profile.lastname,
      city: profile.city,
      country: profile.country,
      age: profile.age,
      currency: profile.currency,
    },
  });

  // TODO: add hook
  useEffect(() => {
    const handleLanguageChange = () => {
      trigger();
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [trigger]);

  const onSubmit = (data: ProfileFormData) => {
    onSave(data);
  };

  return (
    <form
      className={classNames(cls['profile-edit-form'], {}, [className])}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={cls['avatar-section']}>
        <Avatar src={profile.avatar} size={200} />
        <Input
          control={control}
          name="avatar"
          placeholder={t('editForm.avatarURL')}
        />
      </div>

      <div className={cls['form-fields']}>
        <div className={cls.wrap}>
          <Input
            required
            control={control}
            name="username"
            placeholder={t('editForm.userName')}
            label={t('editForm.userName')}
            error={errors.username?.message}
          />
          <Input
            required
            control={control}
            name="age"
            type="number"
            placeholder={t('editForm.age')}
            label={t('editForm.age')}
            error={errors.age?.message}
          />
        </div>
        <div className={cls.wrap}>
          <Input
            required
            control={control}
            name="firstname"
            placeholder={t('editForm.firstName')}
            label={t('editForm.firstName')}
            error={errors.firstname?.message}
          />
          <Input
            required
            control={control}
            name="lastname"
            placeholder={t('editForm.lastName')}
            label={t('editForm.lastName')}
            error={errors.lastname?.message}
          />
        </div>
        <div className={cls.wrap}>
          <Input
            required
            control={control}
            name="city"
            placeholder={t('editForm.city')}
            label={t('editForm.city')}
            error={errors.city?.message}
          />

          <Input
            required
            control={control}
            name="country"
            placeholder={t('editForm.country')}
            label={t('editForm.country')}
            error={errors.country?.message}
          />

          <Select
            control={control}
            name="currency"
            label={t('editForm.currency')}
            options={currencyList}
          />
        </div>

        <div className={cls.actions}>
          <Button
            type="submit"
            theme={THEME_BUTTON.CONFIRM}
            disabled={isLoading}
          >
            {t('save')}
          </Button>
          <Button
            onClick={onCancel}
            disabled={isLoading}
          >
            {t('cancel')}
          </Button>
        </div>
      </div>
    </form>
  );
});
