import { classNames } from 'shared/lib/classNames/classNames';

import { AppLink, AppLinkThemes } from 'shared/ui/AppLink';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button';
import { Portal } from 'widgets/Portal';
import { Modal } from 'widgets/Modal';
import { LoginForm } from 'features/AuthByUsername';
import useModal from 'shared/hooks/useModal';
import { useState } from 'react';
import { THEME_BUTTON } from 'shared/ui/Button/ui/Button';
import { userLogin } from 'features/AuthByUsername/model/services/userLogin/userLogin';
import { useAppDispatch } from 'app/providers/StoreProvider';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

const NavbarPageList = [
  {
    name: 'main',
    to: '/',
  },
  {
    name: 'about',
    to: '/about',
  },
];

const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const { isOpen, handleModalOpen, handleModalClose } = useModal();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    setIsLoading(true);

    dispatch(userLogin({ username, password })).unwrap().then(
      handleModalClose,
    ).catch((error) => {
      console.log('user logged in', error);
    })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const isDisabled = username.length === 0 || password.length === 0;

  return (
    <div data-testid="navbar" className={classNames(cls.navbar, {}, [className])}>
      <nav>
        <ul className={cls['link-list']}>
          {NavbarPageList.map((page) => (
            <li className={cls.link} key={page.name}>
              <AppLink
                to={page.to}
                theme={AppLinkThemes.SECONDARY}
              >
                {t(page.name)}
              </AppLink>
            </li>
          ))}
        </ul>
      </nav>
      <Button onClick={handleModalOpen} theme={THEME_BUTTON.CLEAR}>
        {t('login')}
      </Button>
      <Portal target={document.body}>
        <Modal
          isOpen={isOpen}
          title={t('modals.auth')}
          isConfirmDisabled={isDisabled}
          onClose={handleModalClose}
          onConfirm={handleConfirm}
        >
          <LoginForm
            userName={username}
            password={password}
            onUserNameChange={setUsername}
            onPasswordChange={setPassword}
          />
        </Modal>
      </Portal>
    </div>
  );
};

export default Navbar;
