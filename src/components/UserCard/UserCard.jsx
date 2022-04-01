import React from 'react';

import './UserCard.css';

const UserCard = ({ name, number, loggedInUser }) => {
  const selfTag = loggedInUser?.mobileNumber === number;

  return (
    <div className={`user-card ${selfTag ? 'self' : ''}`}>
      <div className="user-pic">
        <div className="img"></div>
      </div>
      <div className="user-detail">
        <div className="name">{name}</div>
        <div className="number">{number}</div>
      </div>
    </div>
  );
};

export default UserCard;
