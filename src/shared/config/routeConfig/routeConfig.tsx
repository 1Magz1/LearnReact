import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { ReactNode } from 'react';
import { ArticlesPage } from 'pages/ArticlesPage';
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage';
import { ArticleEditPage } from 'pages/ArticleEditPage';

export enum appRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'article_details',
  ARTICLE_EDIT = 'article_edit',
  ARTICLE_CREATE = 'article_create',
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
  [appRoutes.ARTICLE_EDIT]: '/articles/',
  [appRoutes.ARTICLE_CREATE]: '/articles/create',
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
  [appRoutes.ARTICLE_CREATE]: {
    path: routePath[appRoutes.ARTICLE_CREATE],
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [appRoutes.ARTICLE_EDIT]: {
    path: `${routePath[appRoutes.ARTICLE_EDIT]}:id/edit`,
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [appRoutes.NOT_FOUND]: {
    path: routePath[appRoutes.NOT_FOUND],
    element: <NotFoundPage />,
  },
};
