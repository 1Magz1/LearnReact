import './styles/index.scss';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';

import { AppRouter } from 'app/providers/Router';
import { Navbar } from 'widgets/Navbar';

import 'shared/config/i18n/i18n';

function App() {
  return (
    <div className={classNames('app')} id="app">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Navbar />
          <AppRouter />
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
