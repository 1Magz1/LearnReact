import { Select } from 'shared/ui/Select';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { articleActions, ArticleSortField } from 'entities/Article';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { Input } from 'shared/ui/Input';
import { useDebounce } from 'shared/hooks';
import { articleFiltersSchema, OrderBy } from '../../model/schema/articleSchema';
import cls from './ArticleFilters.module.scss';

enum FIELD_NAME {
  SORT = 'sort',
  ORDER = 'order',
  SEARCH = 'search',
}

interface ArticleFiltersProps {
  onValueChange: () => void
}

const ArticleFilters = (props: ArticleFiltersProps) => {
  const { onValueChange } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { control, subscribe } = useForm({
    resolver: zodResolver(articleFiltersSchema),
    defaultValues: {
      sort: ArticleSortField.CREATED_AT,
      order: OrderBy.DESC,
      search: '',
    },
  });

  const sortList = useMemo(() => Object.values(ArticleSortField).map((key) => ({
    value: key,
    content: t(`sort.${key}`),
  })), [t]);

  const orderList = useMemo(() => Object.values(OrderBy).map((key) => ({
    value: key,
    content: t(`sort.${key}`),
  })), [t]);

  const debounceDispatch = useDebounce(
    (values) => dispatch(articleActions.setArticleFilters(values)),
    300,
  );

  const debounceCallback = useDebounce(onValueChange);

  useEffect(() => {
    const callback = subscribe({
      name: [FIELD_NAME.SORT, FIELD_NAME.ORDER] as unknown as string,
      formState: {
        values: true,
      },
      callback: ({ values }) => {
        dispatch(articleActions.setArticleFilters(values));
        onValueChange();
      },
    });

    return () => callback();
  }, [subscribe]);

  useEffect(() => {
    const callback = subscribe({
      name: FIELD_NAME.SEARCH,
      formState: {
        values: true,
      },
      callback: ({ values }) => {
        debounceDispatch(values);
        debounceCallback();
      },
    });

    return () => callback();
  }, [subscribe]);

  return (
    <form className={cls.filter}>
      <div className={cls.wrapper}>
        <div className={cls.select}>
          <Select name={FIELD_NAME.SORT} label={t('sort_by')} control={control} options={sortList} />
        </div>
        <div className={cls.select}>
          <Select name={FIELD_NAME.ORDER} label={t('order')} control={control} options={orderList} />
        </div>
      </div>
      <Input name={FIELD_NAME.SEARCH} control={control} placeholder={t('search')} />
    </form>
  );
};

export default ArticleFilters;
