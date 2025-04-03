import { StoryFn } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export const routeDecorator = (Story: StoryFn) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);
