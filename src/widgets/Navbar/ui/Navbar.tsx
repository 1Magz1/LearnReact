import {classNames} from "shared/lib/classNames/classNames";

import cls from "./Navbar.module.scss";
import {AppLink, AppLinkThemes} from "shared/ui/AppLink";
import {ThemeSwitcher} from "widgets/ThemeSwitcher";

interface NavbarProps {
  className?: string;
}

const NavbarPageList = [
  {
    name: 'Main',
    to: '/'
  },
  {
    name: 'About',
    to: '/about'
  }
]

export const Navbar = ({className}: NavbarProps) => {
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <ThemeSwitcher/>
      <div>
        {NavbarPageList.map((page, index) =>
          <AppLink
            key={page.name + index}
            to={page.to}
            theme={AppLinkThemes.SECONDARY}
            className={cls.link}
          >
            {page.name}
          </AppLink>
        )}
      </div>
    </div>
  );
};
