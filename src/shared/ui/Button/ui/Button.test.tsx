import { render, screen } from '@testing-library/react';
import { Button } from 'shared/ui/Button';
import { ThemeButton } from './Button';

describe('Button', () => {
  test('Test render', () => {
    render(<Button>Test</Button>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  test('Test theme', () => {
    render(<Button className={ThemeButton.CLEAR}>Test</Button>);
    expect(screen.getByText('Test')).toHaveClass('clear');
  });
});
