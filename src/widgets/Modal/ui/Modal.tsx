import { Button } from 'shared/ui/Button';

import { classNames } from 'shared/lib/classNames/classNames';
import {
  ReactNode, SyntheticEvent, useCallback, useEffect,
} from 'react';
import CloseIcon from 'shared/assets/icons/close.svg';
import cls from './Modal.module.scss';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  onConfirm?: () => void;
}

export function Modal(props: ModalProps) {
  const {
    children, title, isOpen, onClose, onConfirm,
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
        <div className={classNames(cls.modal__header)}>
          {title ? <span>{title}</span> : null}
          <Button onClick={onClose} className={cls['modal__header-close-btn']}>
            <CloseIcon />
          </Button>
        </div>
        <div className={classNames(cls.modal__body)}>
          {children}
        </div>
        <div className={classNames(cls.modal__footer)}>
          {onConfirm ? (
            <Button onClick={onConfirm}>
              Confirm
            </Button>
          ) : null}
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
