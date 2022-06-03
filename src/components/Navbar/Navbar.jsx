import React from 'react';
import classes from './navbar.module.css';
import { Link, NavLink } from 'react-router-dom';
// let classes={
//   'nav':'сформированный модулем спец класс'
//   'item':'сформированный модулем спец класс'
// }

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink
          to="/profile"
          className={navData => (navData.isActive ? classes.active : classes.item)}
        >
          Profile
        </NavLink>
      </div>
      <div className={`${classes.item} ${classes.active}`}>
        <NavLink
          to="/dialog"
          className={navData => (navData.isActive ? classes.active : classes.item)}
        >
          Messages
        </NavLink>
      </div>
      <div className={`${classes.item} ${classes.active}`}>
        <NavLink
          to="/users"
          className={navData => (navData.isActive ? classes.active : classes.item)}
        >
          Users
        </NavLink>
      </div>
        <div className={`${classes.item} ${classes.active}`}>
            <NavLink
                to="/chat"
                className={navData => (navData.isActive ? classes.active : classes.item)}
            >
                Chat
            </NavLink>
        </div>
      <div className={classes.item}>
        <NavLink
          to="/news"
          className={navData => (navData.isActive ? classes.active : classes.item)}
        >
          News
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink
          to="/music"
          className={navData => (navData.isActive ? classes.active : classes.item)}
        >
          Music
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink
          to="/setting"
          className={navData => (navData.isActive ? classes.active : classes.item)}
        >
          Settings
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
