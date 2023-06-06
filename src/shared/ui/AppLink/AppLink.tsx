import {classNames} from "shared/lib/classNames/classNames";

import cls from "./AppLink.module.scss";
import {FC} from "react";
import {Link, LinkProps} from "react-router-dom";

export enum AppLinkThemes {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkThemes;
}

export const AppLink: FC<AppLinkProps> = (props) => {
  const {
    to,
    children,
    className,
    theme,
    ...otherProps
  } = props;

  return (
    <Link
      to={to}
      className={classNames(cls.AppLink, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </Link>
  );
};
