import React from 'react';

import ChatScreen from '../../containers/ChatScreen/ChatScreen';
import UserScreen from '../../containers/UserScreen/UserScreen';
import Layout from '../../containers/Layout/Layout';
import './Chat.css';

const ChattingPage = () => {
  return (
    <Layout
      title="Chatly"
      leftComponent={<UserScreen />}
      rightComponent={<ChatScreen />}
    ></Layout>
  );
};

export default ChattingPage;
