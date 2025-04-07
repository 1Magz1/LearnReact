import { StoryFn } from '@storybook/react';
import 'app/styles/index.scss';

export const styleDecorator = (Story: StoryFn) => (
  <Story />
);
