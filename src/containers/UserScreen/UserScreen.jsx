import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import UserCard from '../../components/UserCard/UserCard';
import { ENDPOINT_URL } from '../../utils';
import './UserScreen.css';

const UserScreen = ({ loggedInUser }) => {
  const socketRef = useRef();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    socketRef.current = io.connect(ENDPOINT_URL);
    return () => socketRef.current.disconnect();
  }, []);

  useEffect(() => {
    socketRef.current.emit('activeUsers', actveUsrs => {
      setActiveUsers(actveUsrs);
    });

    return () => socketRef.current.disconnect();
  }, [activeUsers]);

  const buildActiveUsers = function () {
    if (!activeUsers.length)
      return <h4>There are no active users currently.</h4>;

    return activeUsers.map(user => (
      <NavLink
        key={user.mobileNumber}
        to={`/chat/${user.mobileNumber}`}
        className={({ isActive }) =>
          isActive ? 'chat-user-navlink active' : 'chat-user-navlink'
        }
      >
        <UserCard
          name={user.name}
          number={user.mobileNumber}
          loggedInUser={loggedInUser}
        />
      </NavLink>
    ));
  };

  return (
    <div className="user-screen-div">
      <h3 className="head">Active Users</h3>
      {buildActiveUsers()}
    </div>
  );
};

const mapStateToProps = state => {
  const loggedInUser = state.user.user;
  return { loggedInUser };
};

export default connect(mapStateToProps)(UserScreen);
