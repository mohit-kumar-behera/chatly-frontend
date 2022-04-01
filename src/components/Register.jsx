import React, { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { ENDPOINT_URL } from '../utils';

const initialStateRegisterForm = { name: '', mobileNumber: '' };
const initialStateToken = { user: null, registerToken: null };

const Register = function ({ isAuthenticated }) {
  const [registerForm, setRegisterForm] = useState(initialStateRegisterForm);
  const [token, setToken] = useState(initialStateToken);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(ENDPOINT_URL);
    return () => socketRef.current.disconnect();
  }, []);

  const handleInputChange = e => {
    setRegisterForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    if (registerForm.name === '' || registerForm.mobileNumber === '')
      return alert("Fields can't be left empty");

    socketRef.current.emit(
      'register',
      registerForm,
      ({ error, user, registerToken }) => {
        if (error) {
          return alert(error.message);
        }

        setToken(prevState => ({ ...prevState, user, registerToken }));
      }
    );

    setRegisterForm(initialStateRegisterForm);
  };

  const renderOrRedirect = function () {
    if (isAuthenticated) return <Navigate to="/chat" />;

    return (
      <div className="page-div">
        {token.registerToken ? (
          <div className="token-container">
            <h4 style={{ color: '#21978b' }}>Your token for Login is -</h4>
            <br />
            <h4>{token.registerToken}</h4>
          </div>
        ) : (
          <>
            <h2 className="page-head">Register</h2>
            <form
              method="post"
              className="auth-form login"
              onSubmit={handleFormSubmit}
            >
              <input
                type="text"
                name="name"
                value={registerForm.name}
                onChange={handleInputChange}
                className="user-input"
                placeholder="Name"
              />
              <input
                type="number"
                name="mobileNumber"
                value={registerForm.mobileNumber}
                onChange={handleInputChange}
                className="user-input"
                placeholder="Mobile Number"
              />
              <button className="form-btn">Register</button>
            </form>
          </>
        )}
      </div>
    );
  };

  return renderOrRedirect();
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.user;
  return { isAuthenticated };
};

export default connect(mapStateToProps)(Register);
