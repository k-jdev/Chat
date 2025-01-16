import React, { useState, useEffect } from "react";
import { getUsers, searchChats, getLastMessageByChatId } from "../http/api";
import "../styles/ChatList.css";
import User from "./User";
import SearchBar from "./SideBar/SearchBar";
import { faker } from "@faker-js/faker";

const ChatList = ({ onSelectChat }) => {
  const [users, setUsers] = useState([]);
  const [lastMessages, setLastMessages] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let fetchedUsers = searchTerm
          ? await searchChats(searchTerm)
          : await getUsers();
        setUsers(fetchedUsers);

        // Загружаем последние сообщения
        const lastMessagesData = {};
        await Promise.all(
          fetchedUsers.map(async (user) => {
            const lastMessage = await getLastMessageByChatId(user._id);
            lastMessagesData[user._id] = lastMessage || {
              content: "No messages yet",
              createdAt: "",
            };
          })
        );
        setLastMessages(lastMessagesData);
      } catch (error) {
        setError("Failed to fetch users");
      }
    };

    fetchUsers();
  }, [searchTerm]);

  return (
    <div className="chat-list-container">
      <SearchBar onSearch={(term) => setSearchTerm(term)} />
      <h2>Chats</h2>
      {error && <div className="error">{error}</div>}
      {users.map((user) => (
        <div key={user._id} onClick={() => onSelectChat(user._id)}>
          <User
            firstName={user.firstName}
            lastName={user.lastName}
            avatar={user.avatar || faker.image.avatar()}
            lastMessage={lastMessages[user._id]?.content}
            lastDate={new Date(
              lastMessages[user._id]?.createdAt
            ).toLocaleString()}
          />
        </div>
      ))}
    </div>
  );
};

export default ChatList;
