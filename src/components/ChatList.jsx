import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
    <motion.div
      className="chat-list-container"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SearchBar onSearch={(term) => setSearchTerm(term)} />
      <h2 className="chat-list-title">Чати</h2>
      {error && <div className="error">{error}</div>}
      <div className="chat-list">
        {users.map((user) => (
          <motion.div
            key={user._id}
            onClick={() => onSelectChat(user._id)}
            className="chat-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <User
              firstName={user.firstName}
              lastName={user.lastName}
              avatar={user.avatar || faker.image.avatar()}
              lastMessage={lastMessages[user._id]?.content}
              lastDate={new Date(
                lastMessages[user._id]?.createdAt
              ).toLocaleString()}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ChatList;
