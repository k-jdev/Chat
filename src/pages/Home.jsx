import React, { useState } from "react";
import "../App.css";
import ChatList from "../components/Chat/ChatList";
import ChatArea from "../components/Chat/ChatArea";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/features/authSlice";

function Home() {
  const dispatch = useDispatch();

  const [selectedChat, setSelectedChat] = useState(null);
  const currentUser = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="app">
      <div>
        <ChatList
          currentUser={currentUser.user}
          onSelectChat={(chat) => setSelectedChat(chat)}
        />
      </div>
      {selectedChat ? (
        <ChatArea
          currentUser={currentUser.user}
          chatId={selectedChat.chatId}
          chatInfo={selectedChat}
        />
      ) : (
        <div className="chat-area-placeholder">
          <h2 className="chat-area__h2">Виберіть чат</h2>
        </div>
      )}
    </div>
  );
}

export default Home;
