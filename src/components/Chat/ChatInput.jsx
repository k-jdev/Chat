import React, { useState } from "react";
import "../../styles/ChatInput.css";
import { PiTelegramLogo } from "react-icons/pi";

const ChatInput = ({ onSendMessage }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="Type your message"
        className="chat-input__field"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSend}>
        <PiTelegramLogo />
      </button>
    </div>
  );
};

export default ChatInput;
