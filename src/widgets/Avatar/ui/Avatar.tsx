import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

interface AvatarProps {
  src: string,
  size?: number,
  alt?: string,
  className?: string,
}

const Avatar = memo((props: AvatarProps) => {
  const {
    src, size = 120, alt = 'Avatar', className = '',
  } = props;

  return (
    <div
      className={classNames(cls.avatar, {}, [className])}
      style={{ width: size, height: size }}
    >
      <img
        className={cls.img}
        width={size}
        height={size}
        src={src}
        alt={alt}
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/default-avatar.png';
        }}
      />
    </div>
  );
});

export default Avatar;
