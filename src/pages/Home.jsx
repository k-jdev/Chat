import React from "react";
import "../App.css";
import Sidebar from "./../components/SideBar/Sidebar";
import ChatArea from "./../components/Chat/ChatArea";

function Home() {
  return (
    <div className="app">
      <Sidebar />
      {/* <ChatArea /> */}
    </div>
  );
}

export default Home;
