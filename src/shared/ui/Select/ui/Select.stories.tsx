import { Meta, StoryObj } from '@storybook/react';
import Select from './Select';

const meta = {
  title: 'shared/Select',
  component: Select,
  args: {
    options: [
      { value: 'apple', content: 'Apple' },
      { value: 'banana', content: 'Banana' },
      { value: 'orange', content: 'Orange' },
    ],
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
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Placeholder',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
};

export const WithValue: Story = {
  args: {
    value: 'apple',
  },
};

export const WithLabelAndValue: Story = {
  args: {
    label: 'Label and Value',
    value: 'apple',
  },
};
