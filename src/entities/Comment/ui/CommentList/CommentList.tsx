import { Text } from 'shared/ui/Text';
import { Comment } from '../../model/schema/commentSchema';
import CommentCard from '../CommentCard/CommentCard';

interface CommentListProps {
  comments?: Comment[];
}

const CommentList = (props: CommentListProps) => {
  const { comments } = props;

  return (
    <div>
      {comments?.length
        ? comments?.map((comment) => (
          <CommentCard comment={comment} />
        ))
        : <Text>No comments found.</Text>}
    </div>
  );
};

export default CommentList;
