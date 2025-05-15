import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { ReactNode } from 'react';
import { ArticlesPage } from 'pages/ArticlesPage';
import { ArticleDetailsPage } from 'pages/ArticleDitailsPage';

export enum appRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'article_details',
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
  [appRoutes.PROFILE]: '/profile/',
  [appRoutes.ARTICLES]: '/articles',
  [appRoutes.ARTICLE_DETAILS]: '/articles/',
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
    path: `${routePath[appRoutes.PROFILE]}:id`,
    element: <ProfilePage />,
    authOnly: true,
  },
  [appRoutes.ARTICLES]: {
    path: routePath[appRoutes.ARTICLES],
    element: <ArticlesPage />,
    authOnly: true,
  },
  [appRoutes.ARTICLE_DETAILS]: {
    path: `${routePath[appRoutes.ARTICLE_DETAILS]}:id`,
    element: <ArticleDetailsPage />,
    authOnly: true,
  },
  [appRoutes.NOT_FOUND]: {
    path: routePath[appRoutes.NOT_FOUND],
    element: <NotFoundPage />,
  },
};
