import ArticleItem from 'entities/Article/ui/ArticleItem/ArticleItem';
import { Text } from 'shared/ui/Text';
import { Skeleton } from 'widgets/Skeleton';
import { Article, ViewType } from '../../model/schema/articleSchema';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
  list?: Article[];
  viewType: ViewType;
  isLoading: boolean;
}

const ArticleList = (props: ArticleListProps) => {
  const { list, viewType, isLoading } = props;

  if (!list?.length && !isLoading) {
    return (
      <div className={cls[viewType.toLowerCase()]}>
        <Text>No articles found</Text>
      </div>
    );
  }

  return (
    <div className={cls[viewType.toLowerCase()]}>
      {list?.map((article: Article) => (
        <ArticleItem key={article.id} data={article} viewType={viewType} />
      ))}

      {isLoading && (
        <>
          {new Array(8).fill(0).map((_, index) => (
            <Skeleton
              key={`skeleton-${index}`}
              className={cls['skeleton-card']}
              width="100%"
              height={viewType === 'CARD' ? 274 : 628}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ArticleList;
