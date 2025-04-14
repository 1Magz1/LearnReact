import type { Meta, StoryObj } from '@storybook/react';
import { themeDecorator } from 'shared/config/Storybook/decorators/themeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import LoginForm from './LoginForm';

const meta = {
  title: 'entities/LoginForm',
  component: LoginForm,
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    userName: '',
    password: '',
    onUserNameChange: () => null,
    onPasswordChange: () => null,
  },
};

export const Dark: Story = {
  args: {
    userName: '',
    password: '',
    onUserNameChange: () => null,
    onPasswordChange: () => null,
  },
};
Dark.decorators = [themeDecorator(Theme.DARK)];
