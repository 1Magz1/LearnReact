import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input component', () => {
  it('displays the provided value', () => {
    render(<Input value="Test value" />);
    const input = screen.getByDisplayValue('Test value');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange handler when value changes', () => {
    const handleChange = jest.fn();
    render(<Input data-testid="input" value="" onChange={handleChange} />);
    const input = screen.getByTestId('input');

    fireEvent.change(input, { target: { value: 'new' } });
    expect(handleChange).toHaveBeenCalledWith('new');
  });

  it('renders the label when provided', () => {
    render(<Input value="" label="Username" />);
    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();
  });

  it('passes additional props to the input element', () => {
    render(<Input value="" placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });
});
