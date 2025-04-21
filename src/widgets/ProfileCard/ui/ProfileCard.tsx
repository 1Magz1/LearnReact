import { UserProfile } from 'features/UserProfile/model/types/userProfileScheme';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  profile: UserProfile | null;
  className?: string;
}

const ProfileCard = memo(({ profile, className }: ProfileCardProps) => (
  <div className={classNames(cls['profile-card'], {}, [className])}>
    {profile ? (
      <>
        <div className={cls['avatar-wrapper']}>
          <img
            src={profile.avatar}
            alt="Avatar"
            className={cls.avatar}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/default-avatar.png';
            }}
          />
        </div>

        <div className={cls['profile-card__info']}>
          <h2 className={cls['profile-card__name']}>
            {profile.firstname}
            {' '}
            {profile.lastname}
          </h2>

          <div className={cls['profile-card__details']}>
            <div className={cls['profile-card__detail']}>
              <span className={cls['profile-card__label']}>Age:</span>
              <span>{profile.age}</span>
            </div>
            <div className={cls['profile-card__detail']}>
              <span className={cls['profile-card__label']}>Location:</span>
              <span>
                {profile.city}
                ,
                {' '}
                {profile.country}
              </span>
            </div>
          </div>
        </div>
      </>
    ) : (
      null
    )}
  </div>
));

export default ProfileCard;
