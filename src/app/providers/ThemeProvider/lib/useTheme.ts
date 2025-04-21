import { useContext, useEffect } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from 'shared/constants';
import {
  Theme,
  ThemeContext,
} from './ThemeContext';

interface UseTheme {
  theme: Theme;
  toggleTheme: () => void;
}

export const useTheme = (): UseTheme => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return {
    theme,
    toggleTheme,
  };
};
