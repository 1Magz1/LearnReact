import React, {Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {routeConfig} from "shared/config/routeConfig/routeConfig";
import {Sidebar} from "widgets/Sidebar";

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="page-content">
        <Sidebar/>
        <Routes>
          {Object.values(routeConfig).map(({path, element}) => (
            <Route
              key={path}
              path={path}
              element={(
                <Suspense fallback={<div>Loading...</div>}>
                  <div className="page-wrapper">
                    {element}
                  </div>
                </Suspense>
              )}
            />
          ))}
        </Routes>
      </div>
    </Suspense>
  );
};

export default AppRouter;
