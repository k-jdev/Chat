import React from "react";
import "../styles/User.css";

const User = ({ firstName, avatar, lastMessage, lastDate }) => {
  return (
    <div className="user-card">
      <div className="user__avatar">
        <img src={avatar} alt={`${firstName}'s avatar`} className="avatar" />
      </div>
      <div className="user__info">
        <p className="user__name">{firstName}</p>
        <p className="user__last-message">{lastMessage}</p>
      </div>
      <p className="user__last-date">{lastDate}</p>
    </div>
  );
};

export default User;
