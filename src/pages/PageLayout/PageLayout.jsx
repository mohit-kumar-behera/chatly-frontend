import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../../containers/Navbar/Navbar';

import './PageLayout.css';

const PageLayout = () => {
  return (
    <>
      <Navbar />
      <main className="main-container">
        <Outlet />
      </main>
    </>
  );
};

export default PageLayout;
