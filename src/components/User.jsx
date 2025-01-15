import React from "react";

const User = ({ firstName, avatar, lastMessage, lastDate }) => {
  return (
    <div className="user">
      <div className="user__avatar">
        <img src={avatar} alt="User avatar" />
      </div>
      <div className="user__info">
        <div className="user__name">{`${firstName}`}</div>
        <div className="user__last-message">{lastMessage}</div>
        <div className="user__last-date">{lastDate}</div>
      </div>
    </div>
  );
};

export default User;
