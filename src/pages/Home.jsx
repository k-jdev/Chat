import React from "react";
import "../App.css";
import Sidebar from "./../components/SideBar/Sidebar";
import ChatArea from "./../components/Chat/ChatArea";
import ChatList from "../components/ChatList";
import { useState } from "react";

function Home() {
  const [selectedChatId, setSelectedChatId] = useState(null);

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
