import { fireEvent, render, screen } from '@testing-library/react';
import Select from './Select';

const options = [
  { value: 'apple', content: 'Apple' },
  { value: 'banana', content: 'Banana' },
  { value: 'orange', content: 'Orange' },
];

describe('Select component', () => {
  test('renders with label and options', () => {
    render(<Select label="Fruits" options={options} value="apple" />);
    expect(screen.getByText('Fruits')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  test('opens dropdown on click', () => {
    render(<Select options={options} value="apple" />);
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  test('closes dropdown on second click', () => {
    render(<Select options={options} value="apple" />);
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    fireEvent.click(select);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('calls onChange when option selected', () => {
    const onChange = jest.fn();
    render(<Select options={options} value="apple" onChange={onChange} />);
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    fireEvent.click(screen.getByText('Banana'));
    expect(onChange).toHaveBeenCalled();
  });

  test('keyboard navigation: arrow down + enter', () => {
    const onChange = jest.fn();
    render(<Select options={options} value="apple" onChange={onChange} />);
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    fireEvent.keyDown(select, { key: 'ArrowDown' });
    fireEvent.keyDown(select, { key: 'ArrowDown' });
    fireEvent.keyDown(select, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('orange');
  });
});
