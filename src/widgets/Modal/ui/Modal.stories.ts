import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from 'widgets/Modal';
import { Theme } from 'app/providers/ThemeProvider';
import { themeDecorator } from 'shared/config/Storybook/decorators/themeDecorator';

const meta = {
  title: 'widgets/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    title: 'Modal header text',
    isOpen: true,
    children: 'Modal content',
    onClose: () => null,
    onConfirm: () => null,
  },
};
export const Dark: Story = {
  args: {
    title: 'Modal header text',
    isOpen: true,
    children: 'Modal content',
    onClose: () => null,
    onConfirm: () => null,
  },
};
Dark.decorators = [themeDecorator(Theme.DARK)];
