import { Text } from 'shared/ui/Text';
import Avatar from 'widgets/Avatar/ui/Avatar';
import { Comment } from '../../model/schema/commentSchema';
import cls from './CommentCard.module.scss';

interface CommentCard {
  comment: Comment;
}

const CommentCard = (props: CommentCard) => {
  const { comment } = props;

  return (
    <div className={cls.card}>
      <div className={cls.header}>
        {comment.user.avatar?.length && (
          <Avatar src={comment.user.avatar} size={50} />
        )}
        <Text variant="span">
          {comment.user.username}
        </Text>
      </div>
      <Text>
        {comment.text}
      </Text>
    </div>
  );
};

export default CommentCard;
