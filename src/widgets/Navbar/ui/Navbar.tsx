import { classNames } from 'shared/lib/classNames/classNames';

import { AppLink, AppLinkThemes } from 'shared/ui/AppLink';
import { useTranslation } from 'react-i18next';
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

export function Navbar({ className }: NavbarProps) {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div>
        {NavbarPageList.map((page) => (
          <AppLink
            key={page.name}
            to={page.to}
            theme={AppLinkThemes.SECONDARY}
            className={cls.link}
          >
            {t(page.name)}
          </AppLink>
        ))}
      </div>
    </div>
  );
}
