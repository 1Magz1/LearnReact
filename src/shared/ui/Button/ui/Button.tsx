import { classNames } from 'shared/lib/classNames/classNames';

import { FC, HTMLAttributes } from 'react';
import cls from './Button.module.scss';

export enum THEME_BUTTON {
  CLEAR = 'clear',
  OUTLINE = 'outline',
}

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>{
  className?: string;
  theme?: THEME_BUTTON
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    theme,
    ...otherProps
  } = props;
  return (
    <button
      type="button"
      className={classNames(cls.Button, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </button>
  );
};
