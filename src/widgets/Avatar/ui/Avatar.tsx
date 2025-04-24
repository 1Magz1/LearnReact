import { memo } from 'react';
import cls from './Avatar.module.scss';

interface AvatarProps {
  src: string,
  size?: number
}

const Avatar = memo((props: AvatarProps) => {
  const { src, size = 120 } = props;

  return (
    <div>
      <img
        width={size}
        height={size}
        src={src}
        alt="Avatar"
        className={cls.avatar}
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/default-avatar.png';
        }}
      />
    </div>
  );
});

export default Avatar;
