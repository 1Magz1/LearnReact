import { classNames } from 'shared/lib/classNames/classNames';
import {
  memo, useMemo, useState,
} from 'react';
import { Button } from 'shared/ui/Button';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { AppLink, AppLinkThemes } from 'shared/ui/AppLink';
import { useTranslation } from 'react-i18next';
import HomeIcon from 'shared/assets/icons/home.svg';
import AboutIcon from 'shared/assets/icons/about.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import { useLocalStorage } from 'shared/hooks/useLocalStorage';
import { LOCAL_STORAGE_USERNAME_KEY } from 'shared/constants';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

const BASE_PAGES = [
  {
    icon: HomeIcon,
    name: 'main',
    to: '/',
  },
  {
    icon: AboutIcon,
    name: 'about',
    to: '/about',
  },
];

export const Sidebar = memo(({ className }: SidebarProps) => {
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userName] = useLocalStorage(LOCAL_STORAGE_USERNAME_KEY, '');

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const navItems = useMemo(() => {
    const items = [...BASE_PAGES];

    if (userName.length) {
      items.push({
        icon: ProfileIcon,
        name: 'profile',
        to: '/profile',
      });
    } else if (items.length === 3) {
      items.pop();
    }

    return items;
  }, [userName]);

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.sidebar, { [cls.collapsed]: isCollapsed }, [className || ''])}
    >
      <nav>
        <ul className={cls.linkList}>
          {navItems.map(({ icon: Icon, name, to }) => (
            <li key={to} className={cls.link}>
              <AppLink to={to} theme={AppLinkThemes.SECONDARY}>
                <Icon width={35} height={35} className={cls.icon} />
                {!isCollapsed && (
                  <span className={cls.linkText}>{t(name)}</span>
                )}
              </AppLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher />
      </div>

      <Button
        data-testid="sidebar-toggle"
        className={cls.btn}
        onClick={toggleSidebar}
      >
        {isCollapsed ? '>' : '<'}
      </Button>
    </div>
  );
});
