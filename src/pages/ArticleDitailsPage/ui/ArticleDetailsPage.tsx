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
import { AddCommentFormState } from 'entities/AddCommentForm';
import { sendComment } from 'pages/ArticleDitailsPage/model/service/sendComment/sendComment';
import { Button } from 'shared/ui/Button';
import { useNavigate } from 'react-router';
import cls from './ArticleDetailsPage.module.scss';
import { articleCommentsReducer, getArticleComments } from '../model/slice/articleDetailsSlice';
import { fetchArticleComments } from '../model/service/fetchArticleComments/fetchArticleComments';

const reducerList: ReducerObject[] = [
  {
    name: 'article',
    reducer: articleReducer,
  },
  {
    name: 'articleComments',
    reducer: articleCommentsReducer,
  },
];

const ArticleDetailsPage = () => {
  useReducerLoader(reducerList);
  const { t } = useTranslation('articleDetails');
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isCommentSending, setIsCommentSending] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = useAppDispatch();
  const data = useSelector(getArticleData);
  const comments = useSelector(getArticleComments.selectAll);
  const navigate = useNavigate();

  const fetchArticle = useCallback(async () => {
    try {
      if (id) {
        await Promise.all(
          [
            dispatch(fetchArticleData(id)).unwrap(),
            dispatch(fetchArticleComments(id)).unwrap(),
          ],
        );
      }
    } catch (e) {
      setIsError(true);
    }
  }, [dispatch]);

  const onCommentSend = async (data: AddCommentFormState) => {
    setIsCommentSending(true);
    try {
      await dispatch(sendComment(data)).unwrap();
    } catch (e) {
      setIsError(true);
    } finally {
      fetchArticle().then(() => {
        setIsCommentSending(false);
      });
    }
  };

  const handleClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchArticle().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className={cls.skeleton}>
        <Skeleton width={74} height={44} />
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
      <Button onClick={handleClick}>
        {t('back')}
      </Button>
      <ArticleComponent
        data={data}
        comments={comments}
        isLoading={isCommentSending}
        onCommentSave={onCommentSend}
      />
    </div>
  );
};

export default ArticleDetailsPage;
