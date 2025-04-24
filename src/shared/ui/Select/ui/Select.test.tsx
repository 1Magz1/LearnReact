import { fireEvent, render, screen } from '@testing-library/react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import Select from './Select';

const options = [
  { value: 'apple', content: 'Apple' },
  { value: 'banana', content: 'Banana' },
  { value: 'orange', content: 'Orange' },
];

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      fruit: 'apple',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('Select component (react-hook-form)', () => {
  test('renders with label and selected option', () => {
    const TestComponent = () => {
      const methods = useForm({ defaultValues: { fruit: 'apple' } });

      return (
        <FormProvider {...methods}>
          <Select name="fruit" label="Fruits" options={options} control={methods.control} />
        </FormProvider>
      );
    };
    render(<TestComponent />);
    expect(screen.getByText('Fruits')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  test('opens dropdown on click', () => {
    const TestComponent = () => {
      const methods = useForm({ defaultValues: { fruit: 'apple' } });

      return (
        <FormProvider {...methods}>
          <Select name="fruit" label="Fruits" options={options} control={methods.control} />
        </FormProvider>
      );
    };
    render(<TestComponent />);
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  test('closes dropdown on second click', () => {
    const TestComponent = () => {
      const methods = useForm({ defaultValues: { fruit: 'apple' } });

      return (
        <FormProvider {...methods}>
          <Select name="fruit" label="Fruits" options={options} control={methods.control} />
        </FormProvider>
      );
    };
    render(<TestComponent />);
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    fireEvent.click(select);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('selects an option on click', () => {
    const TestComponent = () => {
      const methods = useForm({ defaultValues: { fruit: 'apple' } });
      return (
        <FormProvider {...methods}>
          <Select name="fruit" options={options} control={methods.control} />
          <div data-testid="selected">{methods.watch('fruit')}</div>
        </FormProvider>
      );
    };

    render(<TestComponent />);
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('Banana'));
    expect(screen.getByTestId('selected')).toHaveTextContent('banana');
  });

  test('keyboard navigation works (arrow down + enter)', () => {
    const TestComponent = () => {
      const methods = useForm({ defaultValues: { fruit: 'apple' } });

      return (
        <FormProvider {...methods}>
          <Select name="fruit" options={options} control={methods.control} />
          <div data-testid="selected">{methods.watch('fruit')}</div>
        </FormProvider>
      );
    };

    render(<TestComponent />);
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    fireEvent.keyDown(select, { key: 'ArrowDown' });
    fireEvent.keyDown(select, { key: 'ArrowDown' });
    fireEvent.keyDown(select, { key: 'Enter' });
    expect(screen.getByTestId('selected')).toHaveTextContent('orange');
  });
});
