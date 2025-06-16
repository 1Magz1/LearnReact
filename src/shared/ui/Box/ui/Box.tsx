import { ReactNode, HTMLAttributes } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Box.module.scss';

type VariantType = 'div' | 'section' | 'header' | 'footer' | 'aside' | 'main' | 'article' | 'nav';
type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
type Gap = '0' | '1' | '2' | '3' | '4' | '5';

interface BoxProps extends HTMLAttributes<HTMLElement> {
  variant?: VariantType;
  direction?: FlexDirection;
  justifyContent?: JustifyContent,
  alignItems?: AlignItems,
  gap?: Gap,
  children: ReactNode;
  className?: string;
}

const Box = (props: BoxProps) => {
  const {
    variant = 'div',
    direction = 'column',
    justifyContent = 'flex-start',
    alignItems = 'flex-start',
    gap = '0',
    children,
    className = '',
    ...otherProps
  } = props;

  const Container = variant;

  return (
    <Container
      className={classNames(cls.box, {}, [
        className,
        direction && cls[`box__direction-${direction}`],
        justifyContent && cls[`box__justify-${justifyContent}`],
        alignItems && cls[`box__align-${alignItems}`],
        gap && cls[`box__gap-${gap}`],
      ])}
      {...otherProps}
    >
      {children}
    </Container>
  );
};

export default Box;
