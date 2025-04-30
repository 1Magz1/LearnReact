import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
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

  // TODO: refactoring. Add <Text> component

  return (
    <div className={classNames(cls.PageError)}>
      <h1 className={classNames(cls.title)}>{message || t('pageError')}</h1>
      <Button className={cls.btn} onClick={clickHandler}>{t('reload')}</Button>
    </div>
  );
}
