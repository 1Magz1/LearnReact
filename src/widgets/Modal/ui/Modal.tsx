import { Button } from 'shared/ui/Button';

import { classNames } from 'shared/lib/classNames/classNames';
import {
  ReactNode, SyntheticEvent, useCallback, useEffect,
} from 'react';
import CloseIcon from 'shared/assets/icons/close.svg';
import { THEME_BUTTON } from 'shared/ui/Button/ui/Button';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text';
import { Box } from 'shared/ui/Box';
import cls from './Modal.module.scss';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  isLoading?: boolean;
  isConfirmDisabled?: boolean;
  title?: string;
  confirmText?: string;
  onClose: () => void;
  onConfirm?: () => void;
}

export const Modal = (props: ModalProps) => {
  const { t } = useTranslation();

  const {
    children,
    title,
    isOpen,
    onClose,
    onConfirm,
    confirmText = t('confirm'),
    isConfirmDisabled,
    isLoading,
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
    <Box
      alignItems="center"
      justifyContent="center"
      className={classNames(cls.overlay, { [cls.overlay_open]: isOpen })}
      onClick={onClose}
    >
      <div className={classNames(cls.modal)} onClick={handleContentClick}>
        <Box
          direction="row"
          alignItems="center"
          className={classNames(cls.header)}
        >
          {title ? <Text variant="span">{title}</Text> : null}
          <Button onClick={onClose} className={cls['close-btn']}>
            <CloseIcon className={cls['close-icon']} />
          </Button>
        </Box>
        <div className={classNames(cls.body)}>
          {children}
        </div>
        <Box
          direction="row"
          justifyContent="flex-end"
        >
          {onConfirm ? (
            <Button
              theme={THEME_BUTTON.CONFIRM}
              className={cls['confirm-btn']}
              disabled={isConfirmDisabled}
              isLoading={isLoading}
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          ) : null}
          <Button onClick={onClose}>
            {t('close')}
          </Button>
        </Box>
      </div>
    </Box>
  );
};
