import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';

export enum appRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  NOT_FOUND = 'not_found',
}

export const routePath: Record<appRoutes, string> = {
  [appRoutes.MAIN]: '/',
  [appRoutes.ABOUT]: '/about',
  [appRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<appRoutes, RouteProps> = {
  [appRoutes.MAIN]: {
    path: routePath[appRoutes.MAIN],
    element: <MainPage />,
  },
  [appRoutes.ABOUT]: {
    path: routePath[appRoutes.ABOUT],
    element: <AboutPage />,
  },
  [appRoutes.NOT_FOUND]: {
    path: routePath[appRoutes.NOT_FOUND],
    element: <NotFoundPage />,
  },
};
