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
import { classNames } from 'shared/lib/classNames/classNames';
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
        <Skeleton className={cls.centered} variant="circle" width={200} height={200} />
        <Skeleton className={cls['skeleton-title']} width="50%" height={32} />
        <Skeleton className={cls['skeleton-title']} width="35%" height={24} />
        <Skeleton className={cls['skeleton-view']} width="10%" height={20} />
        <Skeleton width="10%" height={20} />
        <Skeleton className={classNames(cls['skeleton-content'], {}, [cls['skeleton-card']])} height={250} />
        <Skeleton height={250} />
      </div>
    );
  }

  if (!data || isError) {
    return <PageError message={t('error')} />;
  }

  return (
    <div>
      <ArticleComponent data={data} />
    </div>
  );
};

export default ArticleDetailsPage;
