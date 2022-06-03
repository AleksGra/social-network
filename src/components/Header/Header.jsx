import React from 'react';
import classes from './header.module.css';
import { NavLink } from 'react-router-dom';
import module from './header.module.css';
import login from '../Login/Login';

const Header = React.memo(({ authData, logout }) => {
  return (
    <header className={classes.header}>
      <img src="https://marketing.dcassetcdn.com/blog/2018/September/service-sites/BrandCrowd-plumber-4.png" />
      <div className={module.loginBlock}>
        {authData.isAuth ? (
          <div>
            {authData.login}
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <NavLink to={'login'}>Login</NavLink>
        )}
      </div>
    </header>
  );
});

export default Header;
