import { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import Select from './Select';

const meta = {
  title: 'shared/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label для селекта',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder для селекта',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

interface FormValues {
  fruit: string;
}

const options = [
  { value: 'apple', content: 'Apple' },
  { value: 'banana', content: 'Banana' },
  { value: 'orange', content: 'Orange' },
];

interface ArgSchema {
  defaultValue?: string;
  placeholder?: string;
  label?: string;
}

const Template = (args: ArgSchema) => {
  const { placeholder, label, defaultValue } = args;
  const methods = useForm<FormValues>({
    defaultValues: {
      fruit: defaultValue || '',
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <Select
          name="fruit"
          control={methods.control}
          options={options}
          label={label}
          placeholder={placeholder}
        />
      </form>
    </FormProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Default: Story = {
  render: () => <Template placeholder="Placeholder" />,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const WithLabel: Story = {
  render: () => <Template label="Label" placeholder="Choose fruit" />,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const WithValue: Story = {
  render: () => <Template defaultValue="apple" />,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const WithLabelAndValue: Story = {
  render: () => <Template label="Label and Value" defaultValue="apple" />,
};
