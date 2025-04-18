import { I18nextProvider } from 'react-i18next';
import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import i18nForTest from '../../config/i18n/i18nForTest';

function RenderWithTranslation(component: ReactNode, isRouterNeed = true, initialState = {} as StateSchema) {
  return (
    render(
      isRouterNeed ? (
        <BrowserRouter future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
        >
          <I18nextProvider i18n={i18nForTest}>
            <StoreProvider initialState={initialState}>
              {component}
            </StoreProvider>
          </I18nextProvider>
        </BrowserRouter>
      )
        : (
          <I18nextProvider i18n={i18nForTest}>
            <StoreProvider initialState={initialState}>
              {component}
            </StoreProvider>
          </I18nextProvider>
        ),
    )
  );
}

export default RenderWithTranslation;
