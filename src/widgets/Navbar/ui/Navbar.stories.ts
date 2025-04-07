import type { Meta, StoryObj } from '@storybook/react';
import { themeDecorator } from 'shared/config/Storybook/decorators/themeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Navbar } from './Navbar';

const meta = {
  title: 'widgets/Navbar',
  component: Navbar,
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
export const DefaultDark: Story = {
  args: {},
};
DefaultDark.decorators = [themeDecorator(Theme.DARK)];
