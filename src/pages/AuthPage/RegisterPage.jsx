import React from 'react';

import Register from '../../components/Register';
import Layout from '../../containers/Layout/Layout';
import CenterBox from '../../containers/CenterBox/CenterBox';
import './Auth.css';

const RegisterPage = () => {
  return (
    <Layout
      title="Auth"
      rightComponent={
        <CenterBox>
          <Register />
        </CenterBox>
      }
    ></Layout>
  );
};

export default RegisterPage;
