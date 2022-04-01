import React from 'react';
import { Link } from 'react-router-dom';

const Home = function () {
  return (
    <div className="page-div">
      <h2 className="page-head">About Chatly</h2>
      <p className="page-text">
        A chat application makes it easy to communicate with people anywhere in
        the world by sending and receiving messages in real time. With a chat
        app, users are able to receive the same engaging and lively interactions
        through custom messaging features, just as they would in person.
      </p>
      <Link to="chat" className="page-action-btn">
        Start Chatting
      </Link>
    </div>
  );
};

export default Home;
