import {
  ReactNode,
  useMemo,
  useState,
} from 'react';
import { LOCAL_STORAGE_THEME_KEY } from 'shared/constants';
import {
  Theme,
  ThemeContext,
} from '../lib/ThemeContext';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

interface ThemeProviderProps {
  children: ReactNode;
}

function ThemeProvider(props: ThemeProviderProps) {
  const { children } = props;
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const defaultProps = useMemo(() => ({
    theme,
    setTheme,
  }), [theme]);

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
