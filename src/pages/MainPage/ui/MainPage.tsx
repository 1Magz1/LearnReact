import { useTranslation } from 'react-i18next';
import useModal from 'shared/hooks/useModal';
import { Button } from 'shared/ui/Button';
import { Modal } from 'widgets/Modal';
import { Portal } from 'widgets/Portal';
import { Counter } from 'entities/Counter';
import { LoginForm } from 'entities/LoginForm';
import { useState } from 'react';

function MainPage() {
  const { t } = useTranslation('main');
  const { t: translate } = useTranslation();
  const { isOpen, handleModalOpen, handleModalClose } = useModal();
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleConfirm = () => {
    console.log('handleConfirm', { userName, password });
    handleModalClose();
  };

  return (
    <div>
      <h1>{t('title')}</h1>
      <Button onClick={handleModalOpen}>
        Open Modal
      </Button>
      <Counter />
      <Portal target={document.body}>
        <Modal
          isOpen={isOpen}
          onClose={handleModalClose}
          onConfirm={handleConfirm}
          title={translate('modals.auth')}
        >
          <LoginForm
            userName={userName}
            password={password}
            onUserNameChange={setUsername}
            onPasswordChange={setPassword}
          />
        </Modal>
      </Portal>
    </div>
  );
}

export default MainPage;
