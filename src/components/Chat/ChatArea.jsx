import React, { useState, useEffect } from "react";
import "../../styles/ChatArea.css";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { getMessagesByChat, sendMessage, getChatById } from "../../http/api";

const ChatArea = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [chatInfo, setChatInfo] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        // Загружаем данные чата
        const chatData = await getChatById(chatId);
        setChatInfo({
          firstName: chatData.firstName,
          avatar: chatData.userId.avatar,
        });

        // Загружаем сообщения чата
        const fullMessages = await getMessagesByChat(chatId);
        setMessages(fullMessages);
      } catch (err) {
        setError("Ошибка загрузки чата");
      }
    };

    if (chatId) {
      fetchChatData();
    }
  }, [chatId]);

  return (
    <div className="chat-area">
      <ChatHeader name={chatInfo.firstName} avatar={chatInfo.avatar} />
      {error && <div className="error">{error}</div>}
      <div className="chat-area__messages">
        {messages.map((message) => (
          <Message key={message._id} {...message} />
        ))}
      </div>
      <ChatInput
        onSendMessage={async (content) => {
          try {
            const newMessage = await sendMessage(chatId, content, "user");
            setMessages((prev) => [...prev, newMessage]);
          } catch (err) {
            setError("Ошибка отправки сообщения");
          }
        }}
      />
    </div>
  );
};

export default ChatArea;
