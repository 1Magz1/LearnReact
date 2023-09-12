import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './NotFoundPage.module.scss';

function NotFoundPage() {
  const { t } = useTranslation('translation');
  return (
    <div className={classNames(cls.NotFoundPage)}>
      <h1 className={classNames(cls.Title)}>{t('notFound')}</h1>
    </div>
  );
}

export default NotFoundPage;
