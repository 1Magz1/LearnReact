import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text';
import cls from './PageError.module.scss';

interface PageErrorProps {
  message?: string;
}

export function PageError(props: PageErrorProps) {
  const { message } = props;
  const { t } = useTranslation('translation');

  const clickHandler = () => {
    window.location.reload();
  };

  return (
    <div className={classNames(cls.PageError)}>
      <Text variant="h1" className={classNames(cls.title)}>{message || t('pageError')}</Text>
      <Button className={cls.btn} onClick={clickHandler}>{t('reload')}</Button>
    </div>
  );
}
