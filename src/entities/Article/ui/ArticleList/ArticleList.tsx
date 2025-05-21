import ArticleItem from 'entities/Article/ui/ArticleItem/ArticleItem';
import { Text } from 'shared/ui/Text';
import { Article, ViewType } from '../../model/schema/articleSchema';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
  list?: Article[];
  viewType: ViewType;
}

const ArticleList = (props: ArticleListProps) => {
  const { list, viewType } = props;
  return (
    <div className={cls[viewType.toLowerCase()]}>
      {list?.length ? (
        list.map((article: Article) => (
          <ArticleItem key={article.id} data={article} viewType={viewType} />
        ))
      ) : (
        <Text>No article found</Text>
      )}
    </div>
  );
};

export default ArticleList;
