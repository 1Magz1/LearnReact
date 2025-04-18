import { Input } from 'shared/ui/Input';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Modal } from 'widgets/Modal';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { getStatusCodeFromError } from 'shared/lib/getStatusCodeFromError/getStatusCodeFromError';
import { authReducer } from 'features/AuthByUsername';
import useReducerLoader, { ReducerObject } from 'shared/hooks/useReducerLoader';
import { userLogin } from '../../../model/services/userLogin/userLogin';
import cls from './AuthModal.module.scss';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const reducerList: ReducerObject[] = [
  {
    name: 'authInfo',
    reducer: authReducer,
  },
];

function AuthModal(props: AuthModalProps) {
  useReducerLoader(reducerList);
  const { isOpen, onClose } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isDisabled = username.length === 0 || password.length === 0 || isLoading;
  let statusCode = 0;

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
        onClose();
        setPassword('');
        setUsername('');
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title={t('modals.auth')}
      isConfirmDisabled={isDisabled}
      isLoading={isLoading}
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <form className={cls.form}>
        <Input label={t('labels.login')} value={username} onChange={setUsername} />
        <Input label={t('labels.password')} value={password} onChange={setPassword} />
      </form>
      {errorMessage && <span className={cls['error-text']}>{errorMessage}</span>}
    </Modal>
  );
}

export default AuthModal;
