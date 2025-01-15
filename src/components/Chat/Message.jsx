import "../../styles/Message.css";

const Message = ({ content, time, isOutgoing }) => {
  return (
    <div className={`message ${isOutgoing ? "message--outgoing" : ""}`}>
      {!isOutgoing && <div className="message__avatar" />}
      <div>
        <div className="message__content">{content}</div>
        <div className="message__time">{time}</div>
      </div>
    </div>
  );
};

export default Message;
