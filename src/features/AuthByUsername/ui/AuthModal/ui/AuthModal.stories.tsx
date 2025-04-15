import type { Meta, StoryObj } from '@storybook/react';
import { themeDecorator } from 'shared/config/Storybook/decorators/themeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import AuthModal from './AuthModal';

const meta = {
  title: 'entities/LoginForm',
  component: AuthModal,
} satisfies Meta<typeof AuthModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
};
Dark.decorators = [themeDecorator(Theme.DARK)];
