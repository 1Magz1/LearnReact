import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
  variant?: 'circle' | 'rectangular' | 'rounded';
  width?: number;
  height?: number;
}
const Skeleton = memo((props: SkeletonProps) => {
  const { variant = 'rounded', width, height } = props;

  return (
    <div
      className={classNames(cls.skeleton, {}, [cls[variant]])}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
});

export default Skeleton;
