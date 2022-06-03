import React from 'react';
import module from './../dialogs.module.css';

const Message = ({ message }) => {
  return <div className={module.message}>{message}</div>;
};

export default Message;
