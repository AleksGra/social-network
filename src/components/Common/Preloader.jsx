import React from 'react';
import loadingSpinner from '../../assets/Loading_icon.gif';

const Preloader = () => {
  return (
    <div>
      <img src={loadingSpinner} alt="loadingSpinner" />
    </div>
  );
};

export default Preloader;