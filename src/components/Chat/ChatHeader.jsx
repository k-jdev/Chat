import "../../styles/ChatHeader.css";
import { faker } from "@faker-js/faker";
const ChatHeader = ({ name }) => {
  return (
    <div className="chat-header">
      <img className="chat-header__avatar" src={faker.image.avatar()} alt="" />

      <div className="chat-header__info">
        <div className="chat-header__name">{faker.person.firstName()}</div>
        <div className="chat-header__status" />
      </div>
    </div>
  );
};

export default ChatHeader;
