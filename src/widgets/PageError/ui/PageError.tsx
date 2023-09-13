import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PageError.module.scss';

export function PageError() {
  return (
    <div className={classNames(cls.PageError)}>
      <h1 className={classNames(cls.title)}>PageError</h1>
    </div>
  );
}
