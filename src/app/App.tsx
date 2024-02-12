import './styles/index.scss';
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';

import { AppRouter } from 'app/providers/Router';
import { Navbar } from 'widgets/Navbar';

import 'shared/config/i18n/i18n';
import { Sidebar } from 'widgets/Sidebar';

function App() {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', { class1: true }, [theme])}>
      <Suspense fallback="">
        <BrowserRouter>
          <Navbar />
          <div className={classNames('app__wrapper', {}, [])}>
            <Sidebar />
            <AppRouter />
          </div>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
