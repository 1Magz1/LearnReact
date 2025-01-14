import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export const routeDecorator = (Story: Story) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);
