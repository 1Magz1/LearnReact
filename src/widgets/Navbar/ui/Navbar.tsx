import {classNames} from "shared/lib/classNames/classNames";

import cls from "./Navbar.module.scss";
import {AppLink, AppLinkThemes} from "shared/ui/AppLink";
import {useTranslation} from "react-i18next";

interface NavbarProps {
  className?: string;
}

const NavbarPageList = [
  {
    name: "main",
    to: '/',
  },
  {
    name: "about",
    to: '/about',
  }
]

export const Navbar = ({className}: NavbarProps) => {
  const {t} = useTranslation();
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div>
        {NavbarPageList.map((page, index) =>
          <AppLink
            key={page.name + index}
            to={page.to}
            theme={AppLinkThemes.SECONDARY}
            className={cls.link}
          >
            {t(page.name)}
          </AppLink>
        )}
      </div>
    </div>
  );
};
