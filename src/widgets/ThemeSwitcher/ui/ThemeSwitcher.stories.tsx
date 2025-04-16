import type { Meta, StoryObj } from '@storybook/react';
import { themeDecorator } from 'shared/config/Storybook/decorators/themeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import ThemeSwitcher from './ThemeSwitcher';

const meta = {
  title: 'widgets/ThemeSwitcher',
  component: ThemeSwitcher,
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Text',
  },
};

export const PrimaryDark: Story = {
  args: {
    children: 'Text',
  },
};
PrimaryDark.decorators = [themeDecorator(Theme.DARK)];
