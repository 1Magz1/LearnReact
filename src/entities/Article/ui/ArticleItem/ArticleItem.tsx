import React, { useMemo } from 'react';
import { Text } from 'shared/ui/Text';
import { useNavigate } from 'react-router';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Button } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
import TextBlock from 'entities/Article/ui/TextBlock/TextBlock';
import { THEME_BUTTON } from 'shared/ui/Button/ui/Button';
import { Article, ViewType } from '../../model/schema/articleSchema';
import cls from './ArticleItem.module.scss';

interface ArticleItemProps {
  data: Article;
  viewType: ViewType;
}

const ArticleItem = (props: ArticleItemProps) => {
  const { t } = useTranslation('articles');
  const { data, viewType } = props;
  const date = new Date(data.createdAt * 1000);
  const navigate = useNavigate();

  const textBlock = useMemo(() => data.blocks
    .filter((block) => block.type === 'TEXT')
    .slice(0, 1)
    .map((block) => (
      <TextBlock key={block.id} block={block} />
    )), []);

  const handleClick = () => {
    navigate(data.id);
  };

  if (viewType === 'CARD') {
    return (
      <div className={cls[viewType.toLowerCase()]} onClick={handleClick}>
        <img loading="lazy" className={cls.img} src={data.img} alt={data.title} />
        <Text className={cls.date} variant="span">
          {date.toLocaleDateString('ru-Ru')}
        </Text>
        <Text className={cls.view} variant="span">
          <EyeIcon />
          {data.views}
        </Text>
        <div className={cls.footer}>
          <div className={cls.tags}>
            <Text className={cls.tags} variant="span">
              {data.tags.map((tag, index, list) => (
                `${tag}${index !== list.length - 1 ? ', ' : ' '} `
              ))}
            </Text>
          </div>
          <Text className={cls.title} variant="h2">
            {data.title}
          </Text>
        </div>

      </div>
    );
  }

  return (
    <div className={cls[viewType.toLowerCase()]}>
      <div className={cls.header}>
        <Text variant="span">
          {date.toLocaleDateString('ru-Ru')}
        </Text>
      </div>
      <Text className={cls.title} variant="h2">{data.title}</Text>
      <Text className={cls.tags}>
        {data.tags.map((tag, index, list) => (
          `${tag}${index !== list.length - 1 ? ', ' : ' '} `
        ))}
      </Text>
      <img className={cls.img} src={data.img} alt={data.title} />
      {textBlock}
      <div className={cls.footer}>
        <Button theme={THEME_BUTTON.OUTLINE} onClick={handleClick}>
          {t('readMore')}
        </Button>
        <Text className={cls.view} variant="span">
          <EyeIcon />
          {data.views}
        </Text>
      </div>
    </div>
  );
};

export default ArticleItem;
