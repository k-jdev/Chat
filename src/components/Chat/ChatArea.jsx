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
  const [ws, setWs] = useState(null); // WebSocket

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

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3002");

    socket.onopen = () => {
      console.log("WebSocket подключен");
      setWs(socket);

      // Отправляем информацию о чате при подключении
      socket.send(JSON.stringify({ type: "join", chatId }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.chatId === chatId) {
        setMessages((prevMessages) => {
          // Проверяем, есть ли уже это сообщение в списке
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

    socket.onerror = (err) => {
      console.error("WebSocket ошибка:", err);
    };

    return () => {
      socket.close();
    };
  }, [chatId]);

  const handleSendMessage = async (content) => {
    try {
      // Отправляем сообщение на сервер через API
      const newMessage = await sendMessage(chatId, content, "user");
      setMessages((prev) => [...prev, newMessage]);

      // Передаём сообщение через WebSocket
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            type: "message",
            chatId,
            content,
            _id: newMessage._id,
          })
        );
      }
    } catch (err) {
      setError("Ошибка отправки сообщения");
    }
  };

  return (
    <div className="chat-area">
      <ChatHeader name={chatInfo.firstName} avatar={chatInfo.avatar} />
      {error && <div className="error">{error}</div>}
      <div className="chat-area__messages">
        {messages.map((message) => (
          <Message key={message._id} {...message} />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatArea;
