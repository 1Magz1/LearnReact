import type { Meta, StoryObj } from '@storybook/react';
import { themeDecorator } from 'shared/config/Storybook/decorators/themeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { AppLink, AppLinkThemes } from './AppLink';

const meta = {
  title: 'shared/AppLink',
  component: AppLink,
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Text',
    className: AppLinkThemes.PRIMARY,
    to: '/',
  },
};

export const PrimaryDark: Story = {
  args: {
    children: 'Text',
    className: AppLinkThemes.PRIMARY,
    to: '/',
  },
};
PrimaryDark.decorators = [themeDecorator(Theme.DARK)];

export const Secondary: Story = {
  args: {
    children: 'Text',
    className: AppLinkThemes.SECONDARY,
    to: '/',
  },
};

export const SecondaryDark: Story = {
  args: {
    children: 'Text',
    className: AppLinkThemes.SECONDARY,
    to: '/',
  },
};
SecondaryDark.decorators = [themeDecorator(Theme.DARK)];
