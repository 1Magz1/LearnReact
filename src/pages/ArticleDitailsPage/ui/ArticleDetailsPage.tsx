import { Text } from 'shared/ui/Text';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from 'app/providers/StoreProvider';
import {
  ArticleComponent,
  articleReducer, fetchArticleData, getArticleData,
} from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Loader } from 'widgets/Loader';
import { useSelector } from 'react-redux';
import { useReducerLoader } from 'shared/hooks';
import { ReducerObject } from 'app/providers/StoreProvider/config/stateSchema';
import { PageError } from 'widgets/PageError';
import { Skeleton } from 'widgets/Skeleton';

const reducerList: ReducerObject[] = [
  {
    name: 'article',
    reducer: articleReducer,
  },
];

const ArticleDetailsPage = () => {
  useReducerLoader(reducerList);
  const { t } = useTranslation('articleDetails');
  const dispatch = useAppDispatch();
  const data = useSelector(getArticleData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();

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
    setIsLoading(true);
    fetchArticle().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <Skeleton />
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
