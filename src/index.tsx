import React from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { StoreProvider } from 'app/providers/StoreProvider';
import { BrowserRouter } from 'react-router-dom';
import { zodErrorMap } from 'shared/utils/zodErrorMap';
import { z } from 'zod';
import App from './app/App';
import { ThemeProvider } from './app/providers/ThemeProvider';

const root = createRoot(document.getElementById('root')!);
z.setErrorMap(zodErrorMap);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <StoreProvider>
            <App />
          </StoreProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
