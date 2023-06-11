import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { Sidebar } from 'widgets/Sidebar';

function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="page-content">
        <Sidebar />
        <Routes>
          {Object.values(routeConfig).map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={(
                <div className="page-wrapper">
                  {element}
                </div>
              )}
            />
          ))}
        </Routes>
      </div>
    </Suspense>
  );
}

export default AppRouter;
