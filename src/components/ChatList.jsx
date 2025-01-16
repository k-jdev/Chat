import React, { useState, useEffect } from "react";
import { getUsers, searchChats } from "../http/api";
import "../styles/ChatList.css";
import User from "./User";
import SearchBar from "./SideBar/SearchBar";
import { faker } from "@faker-js/faker";

const ChatList = ({ onSelectChat }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let fetchedUsers;
        if (searchTerm) {
          fetchedUsers = await searchChats(searchTerm); // Поиск по запросу
        } else {
          fetchedUsers = await getUsers(); // Получение всех пользователей
        }
        setUsers(fetchedUsers);
      } catch (error) {
        setError("Failed to fetch users");
      }
    };

    fetchUsers();
  }, [searchTerm]);

  return (
    <div className="chat-list-container">
      <SearchBar onSearch={(term) => setSearchTerm(term)} />{" "}
      {/* Добавляем SearchBar */}
      <h2>Chats</h2>
      {error && <div className="error">{error}</div>}
      {/* {users.map((user) => {
        console.log(user);
      })} */}
      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => onSelectChat(user._id)} // Передаём chatId
        >
          <User
            firstName={user.firstName}
            avatar={user.avatar || faker.image.avatar()}
            lastMessage={user.messages[0]?.content || "No messages yet"}
            lastDate={user.messages[0]?.createdAt || ""}
          />
        </div>
      ))}
    </div>
  );
};

export default ChatList;
