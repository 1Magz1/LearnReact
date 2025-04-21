import { memo, useState } from 'react';
import { UserProfile } from 'features/UserProfile/model/types/userProfileScheme';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { THEME_BUTTON } from 'shared/ui/Button/ui/Button';
import cls from './ProfileEditForm.module.scss';

interface ProfileEditFormProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onCancel: () => void;
  className?: string;
  isLoading?: boolean;
}

export const ProfileEditForm = memo(({
  profile,
  onSave,
  onCancel,
  className,
  isLoading,
}: ProfileEditFormProps) => {
  const [formData, setFormData] = useState<UserProfile>(profile);

  const handleChange = (field: keyof UserProfile, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      className={classNames(cls['profile-edit-form'], {}, [className])}
      onSubmit={handleSubmit}
    >
      <div className={cls['avatar-section']}>
        <img
          src={formData.avatar}
          alt="Avatar"
          className={cls.avatar}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/default-avatar.png';
          }}
        />
        <Input
          value={formData.avatar}
          onChange={(value) => handleChange('avatar', value)}
          placeholder="Avatar URL"
        />
      </div>

      <div className={cls['form-fields']}>
        <div className={cls.wrap}>
          <Input
            value={formData.username}
            onChange={(value) => handleChange('username', value)}
            placeholder="Username"
            label="Username"
          />

          <Input
            type="number"
            value={formData.age}
            onChange={(value) => handleChange('age', Number(value))}
            placeholder="Age"
            label="Age"
          />
        </div>
        <div className={cls.wrap}>
          <Input
            value={formData.firstname}
            onChange={(value) => handleChange('firstname', value)}
            placeholder="First Name"
            label="First Name"
          />
          <Input
            value={formData.lastname}
            onChange={(value) => handleChange('lastname', value)}
            placeholder="Last Name"
            label="Last Name"
          />
        </div>
        <div className={cls.wrap}>
          {/* <select */}
          {/*  value={formData.country} */}
          {/*  onChange={(value) => handleChange('country', value as Country)} */}
          {/*  options={Object.entries(Country).map(([key, value]) => ({ */}
          {/*    value, */}
          {/*    content: key, */}
          {/*  }))} */}
          {/*  label="Country" */}
          {/* /> */}

          <Input
            value={formData.city}
            onChange={(value) => handleChange('city', value)}
            placeholder="City"
            label="City"
          />

          {/* <select */}
          {/*  value={formData.currency} */}
          {/*  onChange={(value) => handleChange('currency', value as Currency)} */}
          {/*  options={Object.entries(Currency).map(([key, value]) => ({ */}
          {/*    value, */}
          {/*    content: key, */}
          {/*  }))} */}
          {/*  label="Currency" */}
          {/* /> */}
        </div>

        <div className={cls.actions}>
          <Button
            type="submit"
            theme={THEME_BUTTON.CONFIRM}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
          <Button
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
});
