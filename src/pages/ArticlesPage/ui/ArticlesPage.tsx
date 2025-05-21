import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text';
import { useSelector } from 'react-redux';
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { Skeleton } from 'widgets/Skeleton';
import { PageError } from 'widgets/PageError';
import { useLocalStorage, useReducerLoader } from 'shared/hooks';
import {
  ArticleList,
  articleReducer,
  fetchArticleList,
  getArticleList,
} from 'entities/Article';
import { ReducerObject } from 'app/providers/StoreProvider/config/stateSchema';
import { Button } from 'shared/ui/Button';
import { ViewType } from 'entities/Article/model/schema/articleSchema';
import { LOCAL_STORAGE_VIEW_TYPE } from 'shared/constants';
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
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [viewType, setViewType] = useLocalStorage<ViewType>(LOCAL_STORAGE_VIEW_TYPE, 'CARD');
  const articleList = useSelector(getArticleList);
  const dispatch = useAppDispatch();

  const fetchArticles = useCallback(async () => {
    try {
      await dispatch(fetchArticleList()).unwrap();
    } catch (e) {
      setIsError(true);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchArticles().finally(() => setIsLoading(false));
  }, []);

  const handleClick = () => {
    setViewType(viewType === 'CARD' ? 'FLAT' : 'CARD');
  };

  if (isLoading) {
    return (
      <div className={cls[viewType.toLowerCase()]}>
        <Skeleton className={cls['skeleton-title']} width={200} height={48} />
        <Skeleton className={cls['skeleton-btn']} width={250} height={44} />
        <div className={cls['skeleton-wrap']}>
          { new Array(5).fill(0).map((_, index) => (
            <Skeleton
              key={index}
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
    <>
      <Text variant="h1">{t('title')}</Text>
      <div className={cls.wrap}>
        <Button onClick={handleClick}>
          {t('toggleView')}
        </Button>
      </div>
      <ArticleList list={articleList} viewType={viewType} />
    </>
  );
};

export default ArticlesPage;
