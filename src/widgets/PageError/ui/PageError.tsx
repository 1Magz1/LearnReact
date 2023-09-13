import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
import cls from './PageError.module.scss';

export function PageError() {
  const { t } = useTranslation('translation');

  const clickHandler = () => {
    window.location.reload();
  };

  return (
    <div className={classNames(cls.PageError)}>
      <h1 className={classNames(cls.title)}>{t('pageError')}</h1>
      <Button className={cls.btn} onClick={clickHandler}>{t('reload')}</Button>
    </div>
  );
}
