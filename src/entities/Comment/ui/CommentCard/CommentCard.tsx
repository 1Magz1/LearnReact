import { Text } from 'shared/ui/Text';
import Avatar from 'widgets/Avatar/ui/Avatar';
import { AppLink } from 'shared/ui/AppLink';
import { Comment } from '../../model/schema/commentSchema';
import cls from './CommentCard.module.scss';

interface CommentCard {
  comment: Comment;
}

const CommentCard = (props: CommentCard) => {
  const { comment } = props;

  return (
    <div className={cls.card}>
      <AppLink to={`/profile/${comment.user.id}`} className={cls.header}>
        {comment.user.avatar?.length && (
          <Avatar src={comment.user.avatar} size={50} />
        )}
        <Text variant="span">
          {comment.user.username}
        </Text>
      </AppLink>
      <Text>
        {comment.text}
      </Text>
    </div>
  );
};

export default CommentCard;
