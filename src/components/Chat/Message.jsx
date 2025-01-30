import { useMemo } from "react";
import "../../styles/Message.css";

const Message = ({ content, createdAt, sender }) => {
  const isOutgoing = sender === "user"; // Визначаємо, хто відправив

  // Генеруємо одну фейкову аватарку для вхідних повідомлень
  const avatarUrl = useMemo(() => {
    return "https://i.pravatar.cc/40"; // Використовуємо сервіс для генерації аватарок
  }, []);

  const formattedTime = isNaN(new Date(createdAt).getTime())
    ? "Invalid Date"
    : new Date(createdAt).toLocaleTimeString();

  return (
    <div
      className={`message ${
        isOutgoing ? "message--outgoing" : "message--incoming"
      }`}
    >
      {!isOutgoing && (
        <img
          src={avatarUrl} // Використовуємо одну аватарку
          alt="avatar"
          className="message__avatar"
        />
      )}
      <div className="message__wrapper">
        <div className="message__content">{content}</div>
        <div className="message__time">{formattedTime}</div>
        <div className="message__sender">{sender}</div>
      </div>
    </div>
  );
};

export default Message;
