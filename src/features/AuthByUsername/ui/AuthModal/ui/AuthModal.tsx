import { Input } from 'shared/ui/Input';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Modal } from 'widgets/Modal';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { getStatusCodeFromError } from 'shared/lib/getStatusCodeFromError/getStatusCodeFromError';
import { useStore } from 'react-redux';
import { authReducer } from 'features/AuthByUsername';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider/config/stateSchema';
import DynamicReducerLoader, { ReducerObject } from 'shared/lib/components/DynamicReducerLoader/DynamicReducerLoader';
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

function LoginModal(props: AuthModalProps) {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const store = useStore() as ReduxStoreWithManager;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isDisabled = username.length === 0 || password.length === 0 || isLoading;
  let statusCode = 0;

  useEffect(() => {
    store.reducerManager.add('authInfo', authReducer);
  }, []);

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
    <DynamicReducerLoader reducerList={reducerList}>
      <Modal
        isOpen={isOpen}
        title={t('modals.auth')}
        isConfirmDisabled={isDisabled}
        onClose={onClose}
        onConfirm={handleConfirm}
      >
        <form className={cls.form}>
          <Input label={t('labels.login')} value={username} onChange={setUsername} />
          <Input label={t('labels.password')} value={password} onChange={setPassword} />
        </form>
        {errorMessage && <span className={cls['error-text']}>{errorMessage}</span>}
      </Modal>
    </DynamicReducerLoader>
  );
}

export default LoginModal;
