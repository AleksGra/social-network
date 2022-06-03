import React from 'react';
import module from './../dialogs.module.css';
import { NavLink } from 'react-router-dom';

const DialogItem = ({ name, id }) => {
  return (
    <div className={module.items}>
      <NavLink to={`/dialog/` + id}>{name}</NavLink>
    </div>
  );
};

export default DialogItem;