import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { userLogout } from '../redux/User/action';
import { ENDPOINT_URL } from '../utils';

const Logout = ({ loggedInUser, userLogout }) => {
  const navigate = useNavigate();
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(ENDPOINT_URL);
    return () => socketRef.current.disconnect();
  }, []);

  const handleCancelBtn = function () {
    navigate('/chat');
  };

  const handleLougoutBtn = function () {
    socketRef.current.emit(
      'logout',
      loggedInUser.mobileNumber,
      (error, success) => {
        if (!success) return alert(error?.message);

        userLogout();
        navigate('/');
      }
    );
  };

  return (
    <div className="page-div">
      <h2 className="page-head">Are you sure you want to logout?</h2>
      <div className="page-action-btn-wrapper">
        <button className="page-action-btn cancel" onClick={handleCancelBtn}>
          Cancel
        </button>
        <button className="page-action-btn logout" onClick={handleLougoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { user } = state.user;
  return { loggedInUser: user };
};

export default connect(mapStateToProps, { userLogout })(Logout);
