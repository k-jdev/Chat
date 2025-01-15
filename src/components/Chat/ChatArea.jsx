import React, { useState, useEffect } from "react";
import "../../styles/ChatArea.css";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { createChat, getMessagesByChat, sendMessage } from "../../http/api";

import { useDispatch, useSelector } from "react-redux";

const ChatArea = () => {
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const autoMessagesEnabled = useSelector(
    (state) => state.chat.autoMessagesEnabled
  );

  useEffect(() => {
    initWebSocket(dispatch);

    const initializeChat = async () => {
      try {
        const newChat = await createChat("Alice", "Freeman");
        setChatId(newChat._id);
      } catch (error) {
        setError("Failed to create chat");
      }
    };

    initializeChat();
  }, [dispatch]);

  useEffect(() => {
    if (chatId) {
      const fetchMessages = async () => {
        try {
          const fetchedMessages = await getMessagesByChat(chatId);
          setMessages(fetchedMessages);
        } catch (error) {
          setError("Failed to fetch messages");
        }
      };

      fetchMessages();
    }
  }, [chatId]);

  useEffect(() => {
    const handleWebSocketMessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "autoMessage" || data.type === "message") {
        dispatch(addMessage(data));
      }
    };

    if (autoMessagesEnabled) {
      socket.addEventListener("message", handleWebSocketMessage);
    }

    return () => {
      if (autoMessagesEnabled) {
        socket.removeEventListener("message", handleWebSocketMessage);
      }
    };
  }, [autoMessagesEnabled, dispatch]);

  const handleSendMessage = async (content) => {
    try {
      const newMessage = await sendMessage(chatId, content, "user");
      setMessages([...messages, newMessage]);
    } catch (error) {
      setError("Failed to send message");
    }
  };

  return (
    <div className="chat-area">
      <ChatHeader name="Alice Freeman" />
      {error && <div className="error">{error}</div>}
      <div className="chat-area__messages">
        {messages.map((message, index) => (
          <Message key={index} {...message} />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatArea;
