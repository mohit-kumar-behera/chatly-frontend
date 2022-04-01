import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';

import './Navbar.css';

const Navbar = ({ user, isAuthenticated }) => {
  // const doThis = function () {
  //   localStorage.removeItem('chatlyState');
  //   window.location.reload();
  // };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/">
          <AiFillHome color="#fff" className="home-icon" />
        </Link>
        {/* <button onClick={doThis}>Clear LS</button> */}
      </div>
      <div className="navbar__right">
        {' '}
        {!isAuthenticated ? (
          <>
            <Link className="auth-btn" to="/login">
              Login
            </Link>

            <Link className="auth-btn" to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <h1 className="auth-name" style={{ alignSelf: 'center' }}>
              Hello, {user.name.split(' ')[0]}
            </h1>
            <Link className="auth-btn" to="/logout">
              Logout
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  const { user, isAuthenticated } = state.user;
  return { user, isAuthenticated };
};

export default connect(mapStateToProps)(Navbar);
