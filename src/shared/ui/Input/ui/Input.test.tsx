import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import Input from './Input';

describe('Input component', () => {
  it('displays the provided value', () => {
    const TestComponent = () => {
      const methods = useForm({ defaultValues: { test: 'Test value' } });
      return (
        <FormProvider {...methods}>
          <Input name="test" control={methods.control} />
        </FormProvider>
      );
    };

    render(<TestComponent />);
    const input = screen.getByDisplayValue('Test value');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange handler when value changes (via RHF)', () => {
    const TestComponent = () => {
      const methods = useForm({ defaultValues: { test: '' } });
      return (
        <FormProvider {...methods}>
          <Input name="test" control={methods.control} data-testid="input" />
        </FormProvider>
      );
    };

    render(<TestComponent />);
    const input = screen.getByTestId('input');

    fireEvent.change(input, { target: { value: 'new' } });
    expect((input as HTMLInputElement).value).toBe('new');
  });

  it('renders the label when provided', () => {
    const TestComponent = () => {
      const methods = useForm({ defaultValues: { test: '' } });
      return (
        <FormProvider {...methods}>
          <Input name="test" control={methods.control} label="Username" />
        </FormProvider>
      );
    };

    render(<TestComponent />);
    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();
  });

  it('passes additional props to the input element', () => {
    const TestComponent = () => {
      const methods = useForm({ defaultValues: { test: '' } });
      return (
        <FormProvider {...methods}>
          <Input
            name="test"
            control={methods.control}
            placeholder="Enter text"
          />
        </FormProvider>
      );
    };

    render(<TestComponent />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });
});
