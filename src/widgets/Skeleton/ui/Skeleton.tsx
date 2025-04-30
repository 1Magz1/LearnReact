import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
  variant?: 'circle' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  className?: string;
}
const Skeleton = memo((props: SkeletonProps) => {
  const {
    variant = 'rounded', width, height, className,
  } = props;

  return (
    <div
      className={classNames(cls.skeleton, {}, [cls[variant], className || ''])}
      style={{ width, height }}
    />
  );
});

export default Skeleton;
