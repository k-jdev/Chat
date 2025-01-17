import React from "react";
import "../App.css";
import Sidebar from "./../components/SideBar/Sidebar";
import ChatArea from "./../components/Chat/ChatArea";
import ChatList from "../components/ChatList";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/features/authSlice";

function Home() {
  const dispatch = useDispatch();

  const [selectedChatId, setSelectedChatId] = useState(null);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="app">
      <ChatList onSelectChat={(chatId) => setSelectedChatId(chatId)} />
      {selectedChatId ? (
        <ChatArea chatId={selectedChatId} />
      ) : (
        <p>Select a chat</p>
      )}
    </div>
  );
}

export default Home;
