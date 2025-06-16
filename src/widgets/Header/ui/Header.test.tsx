import { screen } from '@testing-library/react';
import renderWithTranslation from 'shared/lib/forTest/renderWithTranslation';
import Header from './Header';

describe('Header unit test', () => {
  test('Render test', () => {
    renderWithTranslation(<Header />, true);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
