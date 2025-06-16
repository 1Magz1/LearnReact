import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import Avatar from 'widgets/Avatar/ui/Avatar';
import { UserProfile } from 'features/UserProfile';
import { Box } from 'shared/ui/Box';
import { Text } from 'shared/ui/Text';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  profile: UserProfile | null;
  className?: string;
}

const ProfileCard = memo(({ profile, className }: ProfileCardProps) => {
  const { t } = useTranslation();

  return (
    <Box
      alignItems="center"
      direction="column"
      gap="1"
      className={classNames(cls['profile-card'], {}, [className || ''])}
    >
      {profile ? (
        <>
          <Avatar src={profile.avatar} />

          <Box alignItems="center">
            <Text variant="h2">
              {profile.firstname}
              {' '}
              {profile.lastname}
            </Text>
            <Text variant="span" className={cls['profile-card__username']}>
              @
              {profile.username}
            </Text>

            <Box alignItems="center">
              <Box
                direction="row"
                justifyContent="center"
              >
                <Text
                  variant="span"
                  className={cls['profile-card__label']}
                >
                  {t('age')}
                  :
                </Text>
                <Text variant="span">{profile.age}</Text>
              </Box>
              <Box
                direction="row"
                justifyContent="center"
              >
                <Text
                  variant="span"
                  className={cls['profile-card__label']}
                >
                  {t('location')}
                  :
                </Text>
                <Text variant="span">
                  {profile.city}
                  ,
                  {' '}
                  {profile.country}
                </Text>
              </Box>
              <Box
                direction="row"
                justifyContent="center"
              >
                <Text
                  variant="span"
                  className={cls['profile-card__label']}
                >
                  {t('currency')}
                  :
                </Text>
                <Text variant="span">{profile.currency}</Text>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        null
      )}
    </Box>

  );
});

export default ProfileCard;
