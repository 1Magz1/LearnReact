import { classNames } from 'shared/lib/classNames/classNames';

import { AppLink, AppLinkThemes } from 'shared/ui/AppLink';
import { useTranslation } from 'react-i18next';
import { AuthModal } from 'features/AuthByUsername/ui/AuthModal';
import { Button } from 'shared/ui/Button';
import { THEME_BUTTON } from 'shared/ui/Button/ui/Button';
import { authActions } from 'features/AuthByUsername';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { useSelector } from 'react-redux';
import { getAuthInfo } from 'features/AuthByUsername/model/selectors/getAuthInfo/getAuthInfo';
import useModal from 'shared/hooks/useModal';
import { Suspense } from 'react';
import { Portal } from 'widgets/Portal';
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
  const authInfo = useSelector(getAuthInfo);

  const handleLogout = () => {
    dispatch(authActions.setAuthInfo({
      username: '',
      id: -1,
    }));
  };

  const handleClick = () => {
    if (authInfo?.username) {
      handleLogout();
    } else {
      handleModalOpen();
    }
  };

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
      <Button onClick={handleClick} theme={THEME_BUTTON.CLEAR}>
        {authInfo?.username ? t('exit') : t('login')}
      </Button>
      <Suspense fallback="">
        {isOpen && (
          <Portal target={document.body}>
            <AuthModal isOpen={isOpen} onClose={handleModalClose} />
          </Portal>
        )}
      </Suspense>
    </div>
  );
};

export default Navbar;
