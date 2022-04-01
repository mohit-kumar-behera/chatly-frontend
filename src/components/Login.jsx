import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { userLogin } from '../redux/User/action';
import { ENDPOINT_URL } from '../utils';

const Login = function ({ isAuthenticated, userLogin }) {
  const [loginToken, setLoginToken] = useState('');
  const socketRef = useRef();
  const location = useLocation();

  let from = location.state?.from?.pathname || '/';

  useEffect(() => {
    socketRef.current = io.connect(ENDPOINT_URL);
    return () => socketRef.current.disconnect();
  }, []);

  const handleFormSubmit = e => {
    e.preventDefault();

    if (loginToken === '') return alert("Field can't be left empty");

    socketRef.current.emit('login', loginToken, ({ error, decode, token }) => {
      if (error) {
        return alert(error.message);
      }

      // Invalid Token
      if (!decode || !decode.iat) {
        return alert('Token is not Valid');
      }

      // successfull login
      const { name, mobileNumber } = decode;
      const user = { name, mobileNumber };
      userLogin({ user, token });
    });
  };

  // const doThis = function (e) {
  //   setLoginToken(e.target.innerText);
  // };

  const renderOrRedirect = () => {
    if (isAuthenticated) return <Navigate to={from} replace={true} />;

    return (
      <div className="page-div">
        {/* <div>
          <ul>
            <li onClick={doThis}>
              eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9oaXQgS3VtYXIiLCJtb2JpbGVOdW1iZXIiOiI5ODYxMDEzMzk5IiwiaWF0IjoxNjQ4NjcwMTcyfQ.f0JXG6uWr_udhM36ov5crki-PtPEnJwZoFrpp0R7wUE
            </li>
            <li onClick={doThis}>
              eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQVAgRGhpbGxvbiIsIm1vYmlsZU51bWJlciI6Ijk4NzQ2ODI4NDgiLCJpYXQiOjE2NDg2NzA3NzZ9.5-9tKRixF7zfMt6WUPefZGMu_GBXXJ737OBYgd9wnyM
            </li>
            <li onClick={doThis}>
              eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS2FyYW4gS3VuYWwiLCJtb2JpbGVOdW1iZXIiOiI4Mzk0ODU5MjkzIiwiaWF0IjoxNjQ4NjcwODIzfQ.XpzagTMyVA3CBLaItc9aITM2iHXBR0PpBPy62mAARYw
            </li>
          </ul>
        </div> */}
        <h2 className="page-head">Enter Your Token</h2>
        <form
          method="post"
          className="auth-form login"
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            name="login-token"
            value={loginToken}
            onChange={e => setLoginToken(e.target.value)}
            className="user-input"
            placeholder="Token"
          />
          <button className="form-btn">Login</button>
        </form>
      </div>
    );
  };

  return renderOrRedirect();
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.user;
  return { isAuthenticated };
};

export default connect(mapStateToProps, { userLogin })(Login);
