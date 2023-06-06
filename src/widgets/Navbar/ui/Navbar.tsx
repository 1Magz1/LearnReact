import {Link} from "react-router-dom";
import cls from "./Navbar.module.scss";
import {classNames} from "shared/lib/classNames/classNames";

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
