import { classNames } from 'shared/lib/classNames/classNames';

import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { HTMLAttributes } from 'react';

import MoonIcon from 'shared/assets/icons/full-moon.svg';
import SunIcon from 'shared/assets/icons/sun.svg';
import { Button } from 'shared/ui/Button';
import { THEME_BUTTON } from 'shared/ui/Button/ui/Button';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps extends HTMLAttributes<HTMLButtonElement>{
  className?: string;
}

export function ThemeSwitcher(props: ThemeSwitcherProps) {
  const { className } = props;
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      theme={THEME_BUTTON.CLEAR}
      onClick={toggleTheme}
      className={classNames(cls.ThemeSwitcher, {}, [className])}
    >
      {theme === Theme.DARK ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
