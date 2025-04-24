import { render, screen } from '@testing-library/react';
import Text from './Text';

describe('Text component', () => {
  it('renders paragraph by default', () => {
    render(<Text>Test text</Text>);
    const paragraph = screen.getByText('Test text');
    expect(paragraph.tagName).toBe('P');
  });

  it('renders correct HTML tag based on variant prop', () => {
    const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'] as const;

    variants.forEach((variant) => {
      render(
        <Text variant={variant}>
          {`Test ${variant}`}
        </Text>,
      );
      const element = screen.getByText(`Test ${variant}`);
      expect(element.tagName.toLowerCase()).toBe(variant);
    });
  });

  it('applies correct CSS class based on variant', () => {
    render(<Text variant="h1">Heading</Text>);
    const heading = screen.getByText('Heading');
    expect(heading).toHaveClass('text--h1');
  });

  it('merges custom className with default classes', () => {
    render(<Text className="custom-class">Test</Text>);
    const element = screen.getByText('Test');
    expect(element).toHaveClass('text');
    expect(element).toHaveClass('custom-class');
  });

  it('passes additional props to the element', () => {
    render(<Text data-testid="text-element" aria-label="Test label">Test</Text>);
    const element = screen.getByTestId('text-element');
    expect(element).toHaveAttribute('aria-label', 'Test label');
  });

  it('renders children correctly', () => {
    render(
      <Text>
        <span>Nested element</span>
      </Text>,
    );
    const nestedElement = screen.getByText('Nested element');
    expect(nestedElement).toBeInTheDocument();
  });
});
