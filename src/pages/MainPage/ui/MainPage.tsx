import { useTranslation } from 'react-i18next';
import useModal from 'shared/hooks/useModal';
import { Button } from 'shared/ui/Button';
import { Modal } from 'widgets/Modal';
import { Portal } from 'widgets/Portal';
import { Counter } from 'entities/Counter';

function MainPage() {
  const { t } = useTranslation('main');
  const { isOpen, handleModalOpen, handleModalClose } = useModal();

  const handleConfirm = () => {
    console.log('handleConfirm');
  };

  return (
    <div>
      <h1>{t('title')}</h1>
      <Button onClick={handleModalOpen}>
        Open Modal
      </Button>
      <Counter />
      <Portal target={document.body}>
        <Modal isOpen={isOpen} onClose={handleModalClose} onConfirm={handleConfirm} title="title">
          <span>Modal</span>
        </Modal>
      </Portal>
    </div>
  );
}

export default MainPage;
