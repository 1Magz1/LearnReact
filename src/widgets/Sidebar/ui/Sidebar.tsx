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
import ArticleIcon from 'shared/assets/icons/article.svg';
import { useLocalStorage } from 'shared/hooks';
import { LOCAL_STORAGE_USERNAME_ID_KEY, LOCAL_STORAGE_USERNAME_KEY } from 'shared/constants';
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

const AUTH_PAGES = [
  {
    icon: ArticleIcon,
    name: 'articles',
    to: '/articles',
  },
];

export const Sidebar = memo(({ className }: SidebarProps) => {
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userId] = useLocalStorage(LOCAL_STORAGE_USERNAME_ID_KEY, '');

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const navItems = useMemo(() => {
    const items = [...BASE_PAGES];

    if (userId.length) {
      items.push(
        {
          icon: ProfileIcon,
          name: 'profile',
          to: `/profile/${userId}`,
        },
        ...AUTH_PAGES,
      );
    }

    return items;
  }, [userId]);

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
