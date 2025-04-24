import { UserProfile } from 'features/UserProfile/model/types/userProfileScheme';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import Avatar from 'widgets/Avatar/ui/Avatar';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  profile: UserProfile | null;
  className?: string;
}

const ProfileCard = memo(({ profile, className }: ProfileCardProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls['profile-card'], {}, [className])}>
      {profile ? (
        <>
          <div className={cls['avatar-wrapper']}>
            <Avatar src={profile.avatar} />
          </div>

          <div className={cls['profile-card__info']}>
            <h2 className={cls['profile-card__name']}>
              {profile.firstname}
              {' '}
              {profile.lastname}
            </h2>
            <div className={cls['profile-card__username']}>
              @
              {profile.username}
            </div>

            <div className={cls['profile-card__details']}>
              <div className={cls['profile-card__detail']}>
                <span className={cls['profile-card__label']}>
                  {t('age')}
                  :
                </span>
                <span>{profile.age}</span>
              </div>
              <div className={cls['profile-card__detail']}>
                <span className={cls['profile-card__label']}>
                  {t('location')}
                  :
                </span>
                <span>
                  {profile.city}
                  ,
                  {' '}
                  {profile.country}
                </span>
              </div>
              <div className={cls['profile-card__detail']}>
                <span className={cls['profile-card__label']}>
                  {t('currency')}
                  :
                </span>
                <span>{profile.currency}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        null
      )}
    </div>

  );
});

export default ProfileCard;
