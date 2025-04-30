import { Article } from 'entities/Article';
import { memo } from 'react';

interface ArticleComponentProps {
  data: Article
}

const ArticleComponent = (props: ArticleComponentProps) => {
  const { data } = props;

  return (
    <div>
      {data.id}
    </div>
  );
};

export default memo(ArticleComponent);
