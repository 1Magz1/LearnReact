import { render, screen } from '@testing-library/react';
import { Button } from 'shared/ui/Button';

describe('Button', () => {
  test('test', () => {
    render(<Button>Test</Button>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
