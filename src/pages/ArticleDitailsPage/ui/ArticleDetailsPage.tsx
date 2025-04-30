import { Text } from 'shared/ui/Text';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from 'app/providers/StoreProvider';
import {
  ArticleComponent,
  articleReducer,
  fetchArticleData,
  getArticleData,
} from 'entities/Article';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useReducerLoader } from 'shared/hooks';
import { ReducerObject } from 'app/providers/StoreProvider/config/stateSchema';
import { PageError } from 'widgets/PageError';
import { Skeleton } from 'widgets/Skeleton';
import cls from './ArticleDetailsPage.module.scss';

const reducerList: ReducerObject[] = [
  {
    name: 'article',
    reducer: articleReducer,
  },
];

const ArticleDetailsPage = () => {
  useReducerLoader(reducerList);
  const { t } = useTranslation('articleDetails');
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const data = useSelector(getArticleData);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchArticle = useCallback(async () => {
    try {
      if (id) {
        await dispatch(fetchArticleData(id)).unwrap();
      }
    } catch (e) {
      setIsError(true);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchArticle().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className={cls.skeleton}>
        <Skeleton className={cls.centered} variant="circle" width={150} height={150} />
        <Skeleton width="30%" height={30} />
        <Skeleton width="15%" height={20} />
        <Skeleton width="10%" height={10} />
        <Skeleton width="10%" height={10} />
        <Skeleton height={250} />
        <Skeleton height={250} />
      </div>
    );
  }

  if (!data || isError) {
    return <PageError message={t('error')} />;
  }

  return (
    <div>
      <Text variant="h1">{t('title')}</Text>
      <ArticleComponent data={data} />
    </div>
  );
};

export default ArticleDetailsPage;
