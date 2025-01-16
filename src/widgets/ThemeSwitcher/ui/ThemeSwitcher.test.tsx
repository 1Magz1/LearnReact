import { screen } from '@testing-library/react';
import renderWithTranslation from 'shared/lib/forTest/renderWithTranslation';
import { ThemeSwitcher } from './ThemeSwitcher';

describe('ThemeSwitcher unit test', () => {
  test('Render test', () => {
    renderWithTranslation(<ThemeSwitcher />);
    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();
  });
});
