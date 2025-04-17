import './styles/index.scss';
import { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppRouter } from 'app/providers/Router';
import { Navbar } from 'widgets/Navbar';

import 'shared/config/i18n/i18n';
import { Loader } from 'widgets/Loader';

function App() {
  return (
    <div className={classNames('app')} id="app">
      <Suspense fallback={(
        <div style={{ height: '100vw' }}>
          <Loader size={40} />
        </div>
      )}
      >
        <Navbar />
        <AppRouter />
      </Suspense>
    </div>
  );
}

export default App;
