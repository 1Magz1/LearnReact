import { render, screen } from '@testing-library/react';
import { Button } from 'shared/ui/Button';
import { THEME_BUTTON } from './Button';

describe('Button unit test', () => {
  test('Render test', () => {
    render(<Button>Test</Button>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  test('Theme class name test', () => {
    render(<Button className={THEME_BUTTON.CLEAR}>Test</Button>);
    expect(screen.getByText('Test')).toHaveClass('clear');
  });
});
