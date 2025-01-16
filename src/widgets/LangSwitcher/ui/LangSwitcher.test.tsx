import { screen } from '@testing-library/react';
import renderWithTranslation from 'shared/lib/forTest/renderWithTranslation';
import { LangSwitcher } from './LangSwitcher';

describe('LangSwitcher unit test', () => {
  test('Render test', () => {
    renderWithTranslation(<LangSwitcher />);
    expect(screen.getByTestId('lang-switcher')).toBeInTheDocument();
  });
});
