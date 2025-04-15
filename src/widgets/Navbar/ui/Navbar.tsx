import { classNames } from 'shared/lib/classNames/classNames';

import { AppLink, AppLinkThemes } from 'shared/ui/AppLink';
import { useTranslation } from 'react-i18next';
import { AuthModal } from 'features/AuthByUsername/ui/AuthModal';
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
      <AuthModal />
    </div>
  );
};

export default Navbar;
