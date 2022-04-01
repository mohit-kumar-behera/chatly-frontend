import React from 'react';

import logo from '../../assets/logo.png';
import './Layout.css';

const Layout = ({ title, leftComponent, rightComponent }) => {
  return (
    <div className="layout-split">
      <div className="layout-split__left">
        <div className="header">
          <img src={logo} alt="Chatly Logo" />
          <h1>{title}</h1>
        </div>
        {leftComponent ? leftComponent : ''}
      </div>
      <div className="layout-split__right">{rightComponent}</div>
    </div>
  );
};

export default Layout;
