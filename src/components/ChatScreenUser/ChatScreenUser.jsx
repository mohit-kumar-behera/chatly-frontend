import React from 'react';

import UserCard from '../UserCard/UserCard';
import './ChatScreenUser.css';

const ChatScreenUser = ({ chatWithUser }) => {
  return (
    <div className="chat-screen__user">
      <div>
        <UserCard name={chatWithUser.name} number={chatWithUser.mobileNumber} />
      </div>
    </div>
  );
};

export default ChatScreenUser;
