import { classNames } from 'shared/lib/classNames/classNames';

import { HTMLAttributes } from 'react';
import cls from './Button.module.scss';

export enum THEME_BUTTON {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  CONFIRM = 'confirm',
}

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>{
  className?: string;
  theme?: THEME_BUTTON,
  disabled?: boolean,
}

export const Button = (props: ButtonProps) => {
  const {
    className,
    children,
    theme,
    disabled,
    ...otherProps
  } = props;
  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(cls.button, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </button>
  );
};
