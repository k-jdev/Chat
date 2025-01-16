import "../../styles/Message.css";

const Message = ({ content, createdAt, sender }) => {
  const isOutgoing = sender === "user"; // Определяем, кто отправил

  return (
    <div
      className={`message ${
        isOutgoing ? "message--outgoing" : "message--incoming"
      }`}
    >
      {!isOutgoing && <div className="message__avatar" />}
      <div className="message__wrapper">
        <div className="message__content">{content}</div>
        <div className="message__time">
          {new Date(createdAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default Message;
