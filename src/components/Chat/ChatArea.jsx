import React, { useState, useEffect } from "react";
import "../../styles/ChatArea.css";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { getMessagesByChat, sendMessage } from "../../http/api";

const ChatArea = ({ chatId, chatInfo, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fullMessages = await getMessagesByChat(chatId);
        setMessages(fullMessages);
      } catch (err) {
        setError("Ошибка загрузки сообщений");
      }
    };

    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3002");

    socket.onopen = () => {
      console.log("WebSocket подключен");
      setWs(socket);

      socket.send(JSON.stringify({ type: "join", chatId }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.chatId === chatId) {
        setMessages((prevMessages) => {
          if (prevMessages.some((msg) => msg._id === data._id)) {
            return prevMessages;
          }
          return [...prevMessages, data];
        });
      }
    };

    socket.onclose = () => {
      console.log("WebSocket отключен");
    };

    return () => {
      socket.close();
    };
  }, [chatId]);

  const handleSendMessage = async (content) => {
    try {
      // Перевірка, чи chatInfo та chatInfo.participants визначені
      if (!chatInfo || !Array.isArray(chatInfo.participants)) {
        throw new Error("Невірна структура даних учасників чату");
      }

      const receiverId = chatInfo.participants.find(
        (p) => p !== currentUser.id
      ); // Знайти іншого учасника

      if (!receiverId) {
        throw new Error("Не знайдено іншого учасника чату");
      }

      const newMessage = await sendMessage(
        chatId,
        content,
        currentUser.id,
        receiverId
      );
      setMessages((prev) => [...prev, newMessage]);

      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            type: "message",
            chatId,
            content,
            _id: newMessage._id,
            sender: currentUser.id,
          })
        );
      }
    } catch (err) {
      console.log(err);
      // setError("Помилка відправки повідомлення");
    }
  };

  return (
    <div className="chat-area">
      <ChatHeader name={chatInfo.name} avatar={chatInfo.avatar} />
      {error && <div className="error">{error}</div>}
      <div className="chat-area__messages">
        {messages.map((message) => (
          <Message
            key={message._id}
            {...message}
            sender={message.sender._id}
            currentUser={currentUser}
          />
        ))}
      </div>
      <ChatInput
        onSendMessage={handleSendMessage}
        currentUser={currentUser}
        chatInfo={chatInfo}
      />
    </div>
  );
};

export default ChatArea;
