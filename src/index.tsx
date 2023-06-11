import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import { ThemeProvider } from './app/providers/ThemeProvider';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
