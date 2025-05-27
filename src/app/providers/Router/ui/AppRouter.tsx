import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { Sidebar } from 'widgets/Sidebar';
import { Loader } from 'widgets/Loader';
import ProtectedRoute from './ProtectedRoute';

function AppRouter() {
  return (
    <div className="page-content">
      <Sidebar />
      <Suspense fallback={(
        <div style={{ height: '100vw' }}>
          <Loader size={40} />
        </div>
      )}
      >
        <Routes>
          {Object.values(routeConfig).map(({ path, element, authOnly }) => (
            <Route
              key={path}
              path={path}
              element={(
                <div id="page-wrapper" className="page-wrapper">
                  <ProtectedRoute authOnly={authOnly}>
                    {element}
                  </ProtectedRoute>
                </div>
              )}
            />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
}

export default AppRouter;
