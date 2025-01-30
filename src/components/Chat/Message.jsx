import { useMemo } from "react";
import "../../styles/Message.css";

const Message = ({ content, createdAt, sender, currentUser }) => {
  const isOutgoing = sender === currentUser.id; // Визначаємо, хто відправив
  console.log(currentUser);
  // Генеруємо одну фейкову аватарку для вхідних повідомлень
  const avatarUrl = useMemo(() => {
    return "https://i.pravatar.cc/40"; // Використовуємо сервіс для генерації аватарок
  }, []);

  const formattedTime = isNaN(new Date(createdAt).getTime())
    ? "Invalid Date"
    : new Date(createdAt).toLocaleTimeString();

  console.log(content);
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
        {!isOutgoing && <div className="message__sender">{sender}</div>}
      </div>
    </div>
  );
};

export default Message;
