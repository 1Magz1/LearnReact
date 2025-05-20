import { memo, useCallback } from 'react';
import Avatar from 'widgets/Avatar/ui/Avatar';
import { Text } from 'shared/ui/Text';
import EyeIcon from 'shared/assets/icons/eye.svg';
import CalendarIcon from 'shared/assets/icons/calendar.svg';
import { CommentList, Comment } from 'entities/Comment';
import { AddCommentForm, AddCommentFormState } from 'entities/AddCommentForm';
import ImageBlock from '../ImageBlock/ImageBlock';
import CodeBlock from '../CodeBlock/CodeBlock';
import TextBlock from '../TextBlock/TextBlock';
import { Article, BlockType, BookType } from '../../model/schema/articleSchema';
import cls from './ArticleComponent.module.scss';

interface ArticleComponentProps {
  data: Article,
  comments?: Comment[],
  onCommentSave: (data: AddCommentFormState) => void,
  isLoading: boolean,
}

const ArticleComponent = (props: ArticleComponentProps) => {
  const {
    data, comments, onCommentSave, isLoading,
  } = props;
  const date = new Date(data.createdAt * 1000);

  const renderBlock = useCallback((block: BlockType) => {
    switch (block.type) {
      case BookType.TEXT:
        return <TextBlock key={block.id} block={block} />;
      case BookType.CODE:
        return <CodeBlock key={block.id} block={block} />;
      case BookType.IMAGE:
        return <ImageBlock key={block.id} block={block} />;
      default:
        return null;
    }
  }, []);

  return (
    <div className={cls.article}>
      <Avatar size={200} src={data.img} alt="ArticleImg" className={cls.image} />
      <Text variant="h1" className={cls.title}>
        {data.title}
      </Text>
      <Text variant="h2" className={cls.subtitle}>
        {data.subtitle}
      </Text>
      <div className={cls['article-wrap']}>
        <EyeIcon />
        <Text variant="span">
          {data.views}
        </Text>
      </div>
      <div className={cls['article-wrap']}>
        <CalendarIcon />
        <Text variant="span">
          {date.toLocaleDateString('ru-Ru')}
        </Text>
      </div>
      <div className={cls.content}>
        {data.blocks.map((block) => renderBlock(block))}
      </div>
      <AddCommentForm
        className={cls['comment-form']}
        isLoading={isLoading}
        onSave={onCommentSave}
      />
      <CommentList comments={comments} />
    </div>
  );
};

export default memo(ArticleComponent);
