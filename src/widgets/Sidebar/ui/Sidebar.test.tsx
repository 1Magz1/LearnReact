import { fireEvent, screen } from '@testing-library/react';
import renderWithTranslation from 'shared/lib/forTest/renderWithTranslation';
import { Sidebar } from './Sidebar';

describe('Sidebar unit test', () => {
  test('Render test', () => {
    renderWithTranslation(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('Toggle test', () => {
    renderWithTranslation(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();

    const toggleButton = screen.getByTestId('sidebar-toggle');

    fireEvent.click(toggleButton);
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');

    fireEvent.click(toggleButton);
    expect(screen.getByTestId('sidebar')).not.toHaveClass('collapsed');
  });
});
