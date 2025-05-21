import React from 'react';
import { Text } from 'shared/ui/Text';
import { useNavigate } from 'react-router';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { ViewType, Article } from '../../model/schema/articleSchema';
import cls from './ArticleItem.module.scss';

interface ArticleItemProps {
  data: Article;
  viewType: ViewType;
}

const ArticleItem = (props: ArticleItemProps) => {
  const { data, viewType } = props;
  const date = new Date(data.createdAt * 1000);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(data.id);
  };

  return (
    <div className={cls[viewType.toLowerCase()]} onClick={handleClick}>
      <img className={cls.img} src={data.img} alt={data.title} />
      <Text className={cls.date}>
        {date.toLocaleDateString('ru-Ru')}
      </Text>
      <Text className={cls.view}>
        <EyeIcon />
        {data.views}
      </Text>
      <div className={cls.footer}>
        <div className={cls.tags}>
          <Text className={cls.tags}>
            {data.tags.map((tag, index, list) => (
              `${tag}${index !== list.length - 1 ? ', ' : ' '} `
            ))}
          </Text>
        </div>
        <Text className={cls.title}>
          {data.title}
        </Text>
      </div>

    </div>
  );
};

export default ArticleItem;
