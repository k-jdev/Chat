import React, { useState } from "react";
import { PiTelegramLogo } from "react-icons/pi";
import { motion } from "framer-motion";
import styles from "../../styles/ChatInput.module.css";

const ChatInput = ({ onSendMessage, currentUser, chatInfo }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      const messageData = {
        content: input,
        sender: currentUser._id, // текущий пользователь - отправитель
        receiver: chatInfo.chatId, // ID собеседника
      };

      onSendMessage(messageData);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className={styles.chatInput}>
      <input
        type="text"
        placeholder="Написати повідомлення..."
        className={styles.chatInputField}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleSend}
        className={styles.sendButton}
      >
        <PiTelegramLogo />
      </motion.button>
    </div>
  );
};

export default ChatInput;
