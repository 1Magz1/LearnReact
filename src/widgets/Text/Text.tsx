import { ReactNode } from 'react';
import cls from './Text.module.scss';

interface TextProps {
  variant?:'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span',
  children: ReactNode,
  className?: string,
}

const Text = (props: TextProps) => {
  const {
    variant, children, className, ...otherProps
  } = props;
  const Tag = variant || 'p';

  return (
    <Tag className={`text ${cls[`text--${variant}`]} ${className || ''}`} {...otherProps}>
      {children}
    </Tag>
  );
};

export default Text;
