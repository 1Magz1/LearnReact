import { classNames } from 'shared/lib/classNames/classNames';
import { useState } from 'react';
import { Button } from 'shared/ui/Button';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { AppLink, AppLinkThemes } from 'shared/ui/AppLink';
import { useTranslation } from 'react-i18next';
import HomeIcon from 'shared/assets/icons/home.svg';
import AboutIcon from 'shared/assets/icons/about.svg';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

const NavbarPageList = [
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

export function Sidebar({ className }: SidebarProps) {
  const { t } = useTranslation();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.sidebar, { [cls.collapsed]: isCollapsed }, [
        className,
      ])}
    >
      <nav>
        <ul className={cls['link-list']}>
          {NavbarPageList.map((page) => (
            <li className={cls.link} key={page.name}>
              <AppLink
                to={page.to}
                theme={AppLinkThemes.SECONDARY}
              >
                <page.icon width={35} height={35} className={cls.icon} />
                {!isCollapsed && (<span className={cls['link-text']}>{t(page.name)}</span>)}
              </AppLink>
            </li>
          ))}
        </ul>
      </nav>
      <Button data-testid="sidebar-toggle" className={cls.btn} onClick={toggleSidebar}>
        {isCollapsed ? '>' : '<'}
      </Button>
      <div className={classNames(cls.switchers)}>
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
    </div>
  );
}
