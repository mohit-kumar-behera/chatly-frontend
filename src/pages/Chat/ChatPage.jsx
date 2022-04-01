import React from 'react';

import UserScreen from '../../containers/UserScreen/UserScreen';
import Layout from '../../containers/Layout/Layout';
import './Chat.css';

const h1Style = {
  fontWeight: '800',
  margin: '2rem 5rem',
};

const ChatDisplayScreen = () => (
  <h1 style={h1Style}>Please Select an user to Message</h1>
);

const ChatPage = () => {
  return (
    <Layout
      title="Chatly"
      leftComponent={<UserScreen />}
      rightComponent={<ChatDisplayScreen />}
    ></Layout>
  );
};

export default ChatPage;
