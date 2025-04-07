import type { Meta, StoryObj } from '@storybook/react';
import { themeDecorator } from 'shared/config/Storybook/decorators/themeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import AboutPage from './AboutPage';

const meta = {
  title: 'pages/AboutPage',
  component: AboutPage,
} satisfies Meta<typeof AboutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const PrimaryDark: Story = {
  args: {},
};
PrimaryDark.decorators = [themeDecorator(Theme.DARK)];
