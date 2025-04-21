import { classNames } from 'shared/lib/classNames/classNames';
import LoadingIcon from 'shared/assets/icons/loading.svg';

import { HTMLAttributes, memo } from 'react';
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
  isLoading?: boolean,
  type?: 'button' | 'submit'
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    children,
    theme,
    disabled,
    isLoading,
    type = 'button',
    ...otherProps
  } = props;
  return (
    <button
      type={type}
      disabled={disabled}
      className={classNames(cls.button, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {isLoading && (
        <div className={cls.icon}>
          <LoadingIcon width={20} height={20} className={cls['icon-wrap']} />
        </div>
      )}
      {children}
    </button>
  );
});
