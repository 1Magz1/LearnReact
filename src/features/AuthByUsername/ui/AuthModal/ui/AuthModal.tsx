import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from 'shared/ui/Input';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Modal } from 'widgets/Modal';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { getStatusCodeFromError } from 'shared/lib/getStatusCodeFromError/getStatusCodeFromError';
import { authReducer } from 'features/AuthByUsername';
import useReducerLoader, { ReducerObject } from 'shared/hooks/useReducerLoader';
import { AuthFormValues, authSchema } from '../schema/authSchema';
import { userLogin } from '../../../model/services/userLogin/userLogin';
import cls from './AuthModal.module.scss';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const reducerList: ReducerObject[] = [
  { name: 'authInfo', reducer: authReducer },
];

function AuthModal({ isOpen, onClose }: AuthModalProps) {
  useReducerLoader(reducerList);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: AuthFormValues) => {
    let statusCode = 0;

    try {
      setIsLoading(true);
      setErrorMessage('');
      await dispatch(userLogin(data)).unwrap();
    } catch (error) {
      if (error instanceof Error) {
        statusCode = getStatusCodeFromError(error.message);
      }
      setErrorMessage(t('errorMessage.authError'));
    } finally {
      setIsLoading(false);
      if (!statusCode) {
        reset();
        onClose();
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title={t('modals.auth')}
      isConfirmDisabled={isLoading}
      isLoading={isLoading}
      onClose={onClose}
      onConfirm={handleSubmit(onSubmit)}
    >
      <form className={cls.form}>
        <Input
          required
          control={control}
          name="username"
          label={t('labels.login')}
          error={errors.username?.message}
        />

        <Input
          required
          control={control}
          name="password"
          label={t('labels.password')}
          type="password"
          error={errors.password?.message}
        />
      </form>
      {errorMessage && <span className={cls['error-text']}>{errorMessage}</span>}
    </Modal>
  );
}

export default AuthModal;
