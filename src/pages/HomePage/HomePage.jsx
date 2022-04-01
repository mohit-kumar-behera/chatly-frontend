import React from 'react';

import Home from '../../components/Home';
import CenterBox from '../../containers/CenterBox/CenterBox';
import Layout from '../../containers/Layout/Layout';
import './HomePage.css';

const HomePage = () => {
  return (
    <Layout
      title="Home"
      rightComponent={
        <CenterBox>
          <Home />
        </CenterBox>
      }
    ></Layout>
  );
};

export default HomePage;
