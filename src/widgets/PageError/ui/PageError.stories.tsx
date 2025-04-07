import type { Meta, StoryObj } from '@storybook/react';
import { themeDecorator } from 'shared/config/Storybook/decorators/themeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { PageError } from './PageError';

const meta = {
  title: 'widgets/PageError',
  component: PageError,
} satisfies Meta<typeof PageError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const PrimaryDark: Story = {
  args: {},
};
PrimaryDark.decorators = [themeDecorator(Theme.DARK)];
