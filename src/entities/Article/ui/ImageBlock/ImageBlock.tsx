import { Text } from 'shared/ui/Text';
import { ImageBlockType } from '../../model/schema/articleSchema';
import cls from './ImageBlock.module.scss';

interface ImageBlockProps {
  block: ImageBlockType;
}

const ImageBlock = (props: ImageBlockProps) => {
  const { block } = props;
  return (
    <div className={cls.block}>
      <img src={block.src} alt={block.title} className={cls.image} />
      {block.title && (
      <Text
        data-testId="image-caption"
        variant="span"
        className={cls.text}
      >
        {block.title}
      </Text>
      )}
    </div>
  );
};

export default ImageBlock;
