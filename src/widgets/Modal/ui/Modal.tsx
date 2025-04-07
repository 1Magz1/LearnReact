import { Button } from 'shared/ui/Button';

import { classNames } from 'shared/lib/classNames/classNames';
import {
  ReactNode, SyntheticEvent, useCallback, useEffect,
} from 'react';
import CloseIcon from 'shared/assets/icons/close.svg';
import { THEME_BUTTON } from 'shared/ui/Button/ui/Button';
import { useTranslation } from 'react-i18next';
import cls from './Modal.module.scss';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  title?: string;
  confirmText?: string;
  onClose: () => void;
  onConfirm?: () => void;
}

export const Modal = (props: ModalProps) => {
  const { t } = useTranslation();

  const {
    children, title, isOpen, onClose, onConfirm, confirmText = t('confirm'),
  } = props;

  const handleContentClick = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      className={classNames(cls.overlay, { [cls.overlay_open]: isOpen })}
      onClick={onClose}
    >
      <div className={classNames(cls.modal)} onClick={handleContentClick}>
        <div className={classNames(cls.header)}>
          {title ? <span>{title}</span> : null}
          <Button onClick={onClose} className={cls['close-btn']}>
            <CloseIcon className={cls['close-icon']} />
          </Button>
        </div>
        <div className={classNames(cls.body)}>
          {children}
        </div>
        <div className={classNames(cls.footer)}>
          {onConfirm ? (
            <Button theme={THEME_BUTTON.CONFIRM} onClick={onConfirm} className={cls['confirm-btn']}>
              {confirmText}
            </Button>
          ) : null}
          <Button onClick={onClose}>
            {t('close')}
          </Button>
        </div>
      </div>
    </div>
  );
};
