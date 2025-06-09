import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text';
import { useSelector } from 'react-redux';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { StateSchema, useAppDispatch } from 'app/providers/StoreProvider';
import { Skeleton } from 'widgets/Skeleton';
import { PageError } from 'widgets/PageError';
import {
  useIntersectionObserver,
  useLocalStorage,
  useReducerLoader, useThrottle,
} from 'shared/hooks';
import {
  articleActions,
  ArticleFilters,
  ArticleList,
  articleReducer,
  fetchArticleList,
  getArticleList,
  getCurrentArticlePage,
  getIsInit,
} from 'entities/Article';
import { ReducerObject } from 'app/providers/StoreProvider/config/stateSchema';
import { Button } from 'shared/ui/Button';
import { ViewType } from 'entities/Article/model/schema/articleSchema';
import { LOCAL_STORAGE_VIEW_TYPE } from 'shared/constants';
import { getScrollPositionByName, scrollPositionActions } from 'features/SaveScrollPosition';
import { useLocation } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { Loader } from 'widgets/Loader';
import cls from './ArticlesPage.module.scss';

const reducerList: ReducerObject[] = [
  {
    name: 'article',
    reducer: articleReducer,
  },
];

const ArticlesPage = () => {
  useReducerLoader(reducerList);

  const { t } = useTranslation('articles');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [viewType, setViewType] = useLocalStorage<ViewType>(LOCAL_STORAGE_VIEW_TYPE, 'CARD');
  const articleList = useSelector(getArticleList);
  const isInit = useSelector(getIsInit);
  const currentArticlePage = useSelector(getCurrentArticlePage);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollTop = useSelector((state: StateSchema) => getScrollPositionByName(state, pathname));
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const fetchArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(fetchArticleList()).unwrap();
    } catch (e) {
      setIsError(true);
    }
  }, [dispatch]);

  const handleFetchArticles = () => {
    fetchArticles().finally(() => setIsLoading(false));
  };

  const handleClick = () => {
    setViewType(viewType === 'CARD' ? 'FLAT' : 'CARD');
  };

  const handleScroll = useThrottle((e: React.UIEvent<HTMLElement>) => {
    dispatch(scrollPositionActions.setScrollPosition({
      name: pathname,
      position: e.currentTarget.scrollTop,
    }));
  });

  useIntersectionObserver(targetRef, () => {
    if (!isLoading) {
      dispatch(articleActions.setAddToEnd(true));
      handleFetchArticles();
    }
  });

  useEffect(() => {
    if (!isInit) {
      handleFetchArticles();
    }
  }, []);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTop = scrollTop;
    }
  }, [wrapperRef.current]);

  if (isLoading && !articleList?.length) {
    return (
      <div className={classNames(cls[viewType.toLowerCase()], {}, ['page-wrapper'])}>
        <Skeleton className={cls['skeleton-title']} width={200} height={48} />
        <Skeleton className={cls['skeleton-btn']} width={250} height={44} />
        <div className={cls['skeleton-wrapper']}>
          <Skeleton width="100%" height={68} />
          <Skeleton width="100%" height={68} />
        </div>
        <Skeleton width="100%" height={44} />
        <div className={cls['skeleton-wrap']}>
          { new Array(6).fill(0).map((_, index) => (
            <Skeleton
              key={`skeleton-${index}`}
              className={cls['skeleton-card']}
              width="100%"
              height={viewType === 'CARD' ? 274 : 628}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!articleList || isError) {
    return <PageError message={t('error')} />;
  }

  return (
    <section
      ref={wrapperRef}
      className="page-wrapper"
      onScroll={handleScroll}
    >
      <Text variant="h1">{t('title')}</Text>
      <div className={cls.wrap}>
        <Button onClick={handleClick}>
          {t('toggleView')}
        </Button>
      </div>
      <ArticleFilters onValueChange={handleFetchArticles} />

      {isLoading && currentArticlePage === 1 ? (
        <div style={{ height: '65%' }}>
          <Loader size={50} />
        </div>
      ) : (
        <ArticleList
          list={articleList}
          viewType={viewType}
          isLoading={isLoading}
        />
      )}

      <div ref={targetRef} style={{ height: '20px' }} />
    </section>
  );
};

export default ArticlesPage;
