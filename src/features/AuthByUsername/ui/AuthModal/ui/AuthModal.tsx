import { Input } from 'shared/ui/Input';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Portal } from 'widgets/Portal';
import { Modal } from 'widgets/Modal';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { getStatusCodeFromError } from 'shared/lib/getStatusCodeFromError/getStatusCodeFromError';
import { Button } from 'shared/ui/Button';
import { THEME_BUTTON } from 'shared/ui/Button/ui/Button';
import useModal from 'shared/hooks/useModal';
import { useSelector } from 'react-redux';
import { userLogin } from '../../../model/services/userLogin/userLogin';
import { getLoginInfo } from '../../../model/selectors/getLoginInfo/getLoginInfo';
import { authActions } from '../../../model/slice/authSlice';
import cls from './AuthModal.module.scss';

const LoginModal = () => {
  const { t } = useTranslation();
  const { isOpen, handleModalOpen, handleModalClose } = useModal();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isDisabled = username.length === 0 || password.length === 0 || isLoading;
  let statusCode = 0;

  const dispatch = useAppDispatch();
  const loginInfo = useSelector(getLoginInfo);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      statusCode = 0;
      setErrorMessage('');

      await dispatch(userLogin({ username, password })).unwrap();
    } catch (error) {
      statusCode = getStatusCodeFromError(error.message);
      setErrorMessage(t('errorMessage.authError'));
    } finally {
      setIsLoading(false);
      if (!statusCode) {
        handleModalClose();
        setPassword('');
        setUsername('');
      }
    }
  };

  const handleLogout = () => {
    dispatch(authActions.setLoginInfoInfo({
      username: '',
      id: -1,
    }));
  };

  const handleClick = () => {
    if (loginInfo.username) {
      handleLogout();
    } else {
      handleModalOpen();
    }
  };

  return (
    <>
      <Button onClick={handleClick} theme={THEME_BUTTON.CLEAR}>
        {loginInfo.username ? t('exit') : t('login')}
      </Button>

      <Portal target={document.body}>
        <Modal
          isOpen={isOpen}
          title={t('modals.auth')}
          isConfirmDisabled={isDisabled}
          onClose={handleModalClose}
          onConfirm={handleConfirm}
        >
          <form className={cls.form}>
            <Input label={t('labels.login')} value={username} onChange={setUsername} />
            <Input label={t('labels.password')} value={password} onChange={setPassword} />
          </form>
          {errorMessage && <span className={cls['error-text']}>{errorMessage}</span>}
        </Modal>
      </Portal>
    </>
  );
};

export default LoginModal;
