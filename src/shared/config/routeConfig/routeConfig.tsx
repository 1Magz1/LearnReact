import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { ReactNode } from 'react';

export enum appRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  NOT_FOUND = 'not_found',
}

export type AppRouteProps = {
  path: string;
  element: ReactNode;
  authOnly?: boolean;
};

export const routePath: Record<appRoutes, string> = {
  [appRoutes.MAIN]: '/',
  [appRoutes.ABOUT]: '/about',
  [appRoutes.PROFILE]: '/profile',
  [appRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<appRoutes, AppRouteProps> = {
  [appRoutes.MAIN]: {
    path: routePath[appRoutes.MAIN],
    element: <MainPage />,
  },
  [appRoutes.ABOUT]: {
    path: routePath[appRoutes.ABOUT],
    element: <AboutPage />,
  },
  [appRoutes.PROFILE]: {
    path: routePath[appRoutes.PROFILE],
    element: <ProfilePage />,
    authOnly: true,
  },
  [appRoutes.NOT_FOUND]: {
    path: routePath[appRoutes.NOT_FOUND],
    element: <NotFoundPage />,
  },
};
