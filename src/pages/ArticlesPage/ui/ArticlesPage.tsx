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
import { useReducerLoader } from 'shared/hooks';
import {
  ArticleList,
  articleReducer,
  fetchArticleList,
  getArticleList,
} from 'entities/Article';
import { ReducerObject } from 'app/providers/StoreProvider/config/stateSchema';
import { Button } from 'shared/ui/Button';
import { ViewType } from 'entities/Article/model/schema/articleSchema';
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
  const [currentView, setCurrentView] = useState<ViewType>('CARD');
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
    setCurrentView((prev) => (prev === 'CARD' ? 'FLAT' : 'CARD'));
  };

  if (isLoading) {
    return (
      <>
        <Skeleton variant="circle" width={200} height={200} />
        <Skeleton variant="circle" width={200} height={200} />
        <Skeleton variant="circle" width={200} height={200} />
      </>
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
      <ArticleList list={articleList} viewType={currentView} />
    </>
  );
};

export default ArticlesPage;
