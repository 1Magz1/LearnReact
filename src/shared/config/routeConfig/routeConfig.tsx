import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';

export enum appRoutes {
  MAIN = 'main',
  ABOUT = 'about',
}

export const routePath: Record<appRoutes, string> = {
  [appRoutes.MAIN]: '/',
  [appRoutes.ABOUT]: '/about',
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
};
