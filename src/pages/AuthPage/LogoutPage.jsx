import React from 'react';

import Logout from '../../components/Logout';
import Layout from '../../containers/Layout/Layout';
import CenterBox from '../../containers/CenterBox/CenterBox';

const LogoutPage = function () {
  return (
    <Layout
      title="Auth"
      rightComponent={
        <CenterBox>
          <Logout />
        </CenterBox>
      }
    ></Layout>
  );
};

export default LogoutPage;
