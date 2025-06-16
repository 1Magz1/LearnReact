import { useTranslation } from 'react-i18next';
import { AuthModal } from 'features/AuthByUsername/ui/AuthModal';
import { Button } from 'shared/ui/Button';
import { THEME_BUTTON } from 'shared/ui/Button/ui/Button';
import { authActions } from 'features/AuthByUsername';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { useModal, useLocalStorage } from 'shared/hooks';
import {
  Suspense,
} from 'react';
import { Portal } from 'widgets/Portal';
import { LOCAL_STORAGE_USERNAME_KEY } from 'shared/constants';
import { Box } from 'shared/ui/Box';
import { Text } from 'shared/ui/Text';
import cls from './Header.module.scss';

const Header = () => {
  const { t } = useTranslation();
  const { isOpen, handleModalOpen, handleModalClose } = useModal();
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useLocalStorage(LOCAL_STORAGE_USERNAME_KEY, '');

  const handleLogout = () => {
    setUserName('');
    dispatch(authActions.setAuthInfo({
      username: '',
      id: -1,
    }));
  };

  const handleClick = () => {
    if (userName.length) {
      handleLogout();
    } else {
      handleModalOpen();
    }
  };

  return (
    <Box
      variant="header"
      direction="row"
      data-testid="header"
      justifyContent="space-between"
      className={cls.navbar}
    >
      <Text variant="span">
        Learn React
      </Text>
      <Button onClick={handleClick} theme={THEME_BUTTON.CLEAR}>
        {userName.length ? t('exit') : t('login')}
      </Button>
      <Suspense fallback="">
        {isOpen && (
          <Portal target={document.body}>
            <AuthModal isOpen={isOpen} onClose={handleModalClose} />
          </Portal>
        )}
      </Suspense>
    </Box>
  );
};

export default Header;
