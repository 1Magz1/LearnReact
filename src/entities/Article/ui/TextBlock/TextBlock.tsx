import { Text } from 'shared/ui/Text';
import { TextBlockType } from '../../model/schema/articleSchema';
import cls from './TextBlock.module.scss';

interface TextBlockProps {
  block: TextBlockType;
}

const TextBlock = (props: TextBlockProps) => {
  const { block } = props;
  return (
    <div className={cls.block}>
      <Text variant="h3" className={cls.title}>
        {block.title}
      </Text>
      {block.paragraphs.map((paragraph) => <Text key={paragraph} variant="p" className={cls.text}>{paragraph}</Text>)}
    </div>
  );
};

export default TextBlock;
