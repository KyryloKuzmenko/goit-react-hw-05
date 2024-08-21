import { NavLink } from "react-router-dom";
import clsx from "clsx";
import style from "./Navigation.module.css";

const Navigation = () => {
  return (
    <header className={style.header}>
      <div className={`container ${style.linksWrap}`}>
        <NavLink
          className={({ isActive }) =>
            clsx(style.link, isActive && style.active)
          }
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx(style.link, isActive && style.active)
          }
        >
          Movies
        </NavLink>
      </div>
    </header>
  );
};

export default Navigation;
