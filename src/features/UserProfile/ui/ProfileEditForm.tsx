import { FormEvent, memo, useState } from 'react';
import { Currency, UserProfile } from 'features/UserProfile/model/types/userProfileScheme';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { THEME_BUTTON } from 'shared/ui/Button/ui/Button';
import { Select } from 'shared/ui/Select';
import { useTranslation } from 'react-i18next';
import Avatar from 'widgets/Avatar/ui/Avatar';
import cls from './ProfileEditForm.module.scss';

interface ProfileEditFormProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
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
  const [formData, setFormData] = useState<UserProfile>(profile);

  const handleChange = (field: keyof UserProfile, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      className={classNames(cls['profile-edit-form'], {}, [className])}
      onSubmit={handleSubmit}
    >
      <div className={cls['avatar-section']}>
        <Avatar src={formData.avatar} size={200} />
        <Input
          value={formData.avatar}
          onChange={(value) => handleChange('avatar', value)}
          placeholder={t('editForm.avatarURL')}
        />
      </div>

      <div className={cls['form-fields']}>
        <div className={cls.wrap}>
          <Input
            value={formData.username}
            onChange={(value) => handleChange('username', value)}
            placeholder={t('editForm.userName')}
            label={t('editForm.userName')}
          />

          <Input
            type="number"
            value={formData.age}
            onChange={(value) => handleChange('age', Number(value))}
            placeholder={t('editForm.age')}
            label={t('editForm.age')}
          />
        </div>
        <div className={cls.wrap}>
          <Input
            value={formData.firstname}
            onChange={(value) => handleChange('firstname', value)}
            placeholder={t('editForm.firstName')}
            label={t('editForm.firstName')}
          />
          <Input
            value={formData.lastname}
            onChange={(value) => handleChange('lastname', value)}
            placeholder={t('editForm.lastName')}
            label={t('editForm.lastName')}
          />
        </div>
        <div className={cls.wrap}>
          <Input
            value={formData.city}
            onChange={(value) => handleChange('city', value)}
            placeholder={t('editForm.city')}
            label={t('editForm.city')}
          />

          <Input
            value={formData.country}
            onChange={(value) => handleChange('country', value)}
            placeholder={t('editForm.country')}
            label={t('editForm.country')}
          />

          <Select
            label={t('editForm.currency')}
            value={formData.currency}
            options={currencyList}
            onChange={(value) => handleChange('currency', value)}
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
