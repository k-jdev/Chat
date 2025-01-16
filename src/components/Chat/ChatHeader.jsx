import "../../styles/ChatHeader.css";
import { faker } from "@faker-js/faker";
const ChatHeader = ({ name, avatar }) => {
  return (
    <div className="chat-header">
      <img className="chat-header__avatar" src={avatar} alt="" />

      <div className="chat-header__info">
        <div className="chat-header__name">{name}</div>
        <div className="chat-header__status" />
      </div>
    </div>
  );
};

export default ChatHeader;
