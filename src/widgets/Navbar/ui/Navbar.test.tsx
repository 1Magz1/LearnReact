import { screen } from '@testing-library/react';
import renderWithTranslation from 'shared/lib/forTest/renderWithTranslation';
import { Navbar } from './Navbar';

describe('Navbar unit test', () => {
  test('Render test', () => {
    renderWithTranslation(<Navbar />, true);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });
});
