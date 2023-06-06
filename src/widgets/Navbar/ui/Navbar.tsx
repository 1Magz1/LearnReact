import {Link} from "react-router-dom";
import {classNames} from "shared/lib/classNames/classNames";

import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Link to="/">Main</Link>
      <Link to="/about">About</Link>
    </div>
  );
};
