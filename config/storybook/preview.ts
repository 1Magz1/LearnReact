import type { Preview } from '@storybook/react';
import { styleDecorator } from '../../src/shared/config/Storybook/decorators/styleDecorator';
import { themeDecorator } from '../../src/shared/config/Storybook/decorators/themeDecorator';
import { Theme } from '../../src/app/providers/ThemeProvider';
import { routeDecorator } from '../../src/shared/config/Storybook/decorators/routeDecorator';
import { i18nDecorator } from '../../src/shared/config/Storybook/decorators/i18nDecorator';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    staticDirs: ['../../public'],
  },
  decorators: [
    styleDecorator,
    themeDecorator(Theme.LIGHT),
    routeDecorator,
    i18nDecorator,
  ],
};

export default preview;
