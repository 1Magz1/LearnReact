import { Button } from 'shared/ui/Button';
import CopyIcon from 'shared/assets/icons/copy.svg';
import { CodeBlockType } from '../../model/schema/articleSchema';
import cls from './CodeBlock.module.scss';

interface CodeBlockProps {
  block: CodeBlockType;
}

const CodeBlock = (props: CodeBlockProps) => {
  const { block } = props;

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(block.code);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={cls.block}>
      <Button data-testid="copy-button" className={cls.btn} onClick={handleClick}>
        <CopyIcon />
      </Button>
      <pre className={cls.code}>
        <code>
          {block.code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
