import { StoryFn } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'app/providers/StoreProvider';

export const routeDecorator = (Story: StoryFn) => (
  <BrowserRouter>
    <StoreProvider>
      <Story />
    </StoreProvider>
  </BrowserRouter>
);
