import {classNames} from "shared/lib/classNames/classNames";

import cls from "./Sidebar.module.scss";
import {useState} from "react";
import {Button} from "shared/ui/Button";
import {ThemeSwitcher} from "widgets/ThemeSwitcher";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({className}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  }
  return (
    <div className={classNames(cls.Sidebar, {[cls.collapsed]: isCollapsed}, [className])}>
      <Button onClick={toggleSidebar}>
        {isCollapsed ? 'Open' : 'Close'}
      </Button>
      <div className={classNames(cls.switchers)}>
        <ThemeSwitcher/>
      </div>
    </div>
  );
};
