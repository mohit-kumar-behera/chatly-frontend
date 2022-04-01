import React from 'react';

import Login from '../../components/Login';
import Layout from '../../containers/Layout/Layout';
import CenterBox from '../../containers/CenterBox/CenterBox';
import './Auth.css';

const LoginPage = () => {
  return (
    <Layout
      title="Auth"
      rightComponent={
        <CenterBox>
          <Login />
        </CenterBox>
      }
    ></Layout>
  );
};

export default LoginPage;
