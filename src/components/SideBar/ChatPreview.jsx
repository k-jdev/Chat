import React from "react";
import "../../styles/ChatPreview.css";
import { faker } from "@faker-js/faker";

const ChatPreview = ({ lastMessage, date }) => {
  return (
    <div className="chat-preview">
      <img className="chat-preview__avatar" src={faker.image.avatar()} alt="" />

      <div className="chat-preview__info">
        <div className="chat-preview__name">{faker.person.firstName()}</div>
        <div className="chat-preview__message">{lastMessage}</div>
      </div>
      <div className="chat-preview__date">{date}</div>
    </div>
  );
};

export default ChatPreview;
