import type { Meta, StoryObj } from '@storybook/react';
import { themeDecorator } from 'shared/config/Storybook/decorators/themeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Button, THEME_BUTTON } from './Button';

const meta = {
  title: 'shared/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Text',
  },
};
export const DefaultDark: Story = {
  args: {
    children: 'Text',
  },
};
DefaultDark.decorators = [themeDecorator(Theme.DARK)];

export const Clear: Story = {
  args: {
    children: 'Text',
    theme: THEME_BUTTON.CLEAR,
  },
};
export const ClearDark: Story = {
  args: {
    children: 'Text',
    theme: THEME_BUTTON.CLEAR,
  },
};
ClearDark.decorators = [themeDecorator(Theme.DARK)];

export const Outline: Story = {
  args: {
    children: 'Text',
    theme: THEME_BUTTON.OUTLINE,
  },
};
export const OutlineDark: Story = {
  args: {
    children: 'Text',
    theme: THEME_BUTTON.OUTLINE,
  },
};
OutlineDark.decorators = [themeDecorator(Theme.DARK)];

export const Confirm: Story = {
  args: {
    children: 'Text',
    theme: THEME_BUTTON.CONFIRM,
  },
};
export const ConfirmDark: Story = {
  args: {
    children: 'Text',
    theme: THEME_BUTTON.CONFIRM,
  },
};

ConfirmDark.decorators = [themeDecorator(Theme.DARK)];
