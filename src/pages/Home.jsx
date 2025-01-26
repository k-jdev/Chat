import React, { useState } from "react";
import "../App.css";
import ChatList from "../components/Chat/ChatList";
import ChatArea from "../components/Chat/ChatArea";
import { useDispatch } from "react-redux";
import { logout } from "../store/features/authSlice";

function Home() {
  const dispatch = useDispatch();

  const [selectedChat, setSelectedChat] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="app">
      <div>
        <ChatList onSelectChat={(chat) => setSelectedChat(chat)} />
      </div>
      {selectedChat ? (
        <ChatArea chatId={selectedChat.chatId} chatInfo={selectedChat} />
      ) : (
        <div className="chat-area-placeholder">
          <h2 className="chat-area__h2">Виберіть чат</h2>
        </div>
      )}
    </div>
  );
}

export default Home;
