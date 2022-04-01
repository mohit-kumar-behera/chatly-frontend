import React, { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';

import './ChatScreenMessageCreate.css';

const ChatScreenMessageCreate = ({ onSendMessageHandler }) => {
  const [message, setMessage] = useState('');

  const onSubmitHandler = function (e) {
    e.preventDefault();
    onSendMessageHandler(message);

    // After successfully sending the message
    setMessage('');
  };

  return (
    <div className="chat-screen__message-create">
      <form className="message-form" method="post" onSubmit={onSubmitHandler}>
        <input
          type="text"
          name="message"
          className="input-message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Write your message"
          spellCheck="false"
          autoComplete="off"
        />
        <button className="message-send-btn">
          <AiOutlineSend />
        </button>
      </form>
    </div>
  );
};

export default ChatScreenMessageCreate;
