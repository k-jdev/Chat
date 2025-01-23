import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getUsers, searchChats, getLastMessageByChatId } from "../../http/api";
import "../../styles/ChatList.css";
import User from "../User";
import SearchBar from "../SideBar/SearchBar";
import { faker } from "@faker-js/faker";
import ProfileModal from "./../SideBar/ProfileModal";

const ChatList = ({ onSelectChat }) => {
  const [users, setUsers] = useState([]);
  const [lastMessages, setLastMessages] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [avatars, setAvatars] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

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

        const storedAvatars = JSON.parse(localStorage.getItem("avatars")) || {};
        const newAvatars = { ...storedAvatars };

        fetchedUsers.forEach((user) => {
          if (!storedAvatars[user._id]) {
            newAvatars[user._id] = user.avatar || faker.image.avatar();
          }
        });

        setAvatars(newAvatars);
        localStorage.setItem("avatars", JSON.stringify(newAvatars));
      } catch (error) {
        setError("Failed to fetch users");
      }
    };

    fetchUsers();
  }, [searchTerm]);

  const handleSelectChat = (user) => {
    onSelectChat({
      chatId: user._id,
      avatar: avatars[user._id],
      name: `${user.firstName} ${user.lastName}`,
    });
  };

  return (
    <motion.div
      className="chat-list-container"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="chat-list-header">
        {" "}
        <SearchBar onSearch={(term) => setSearchTerm(term)} />
        <ProfileModal isVisible={isModalVisible} onClose={toggleModal} />
      </div>
      <h2 className="chat-list-title">Чати</h2>
      {error && <div className="error">{error}</div>}
      <div className="chat-list">
        <div className="chat-list-scrollable">
          {users.map((user) => (
            <motion.div
              key={user._id}
              onClick={() => handleSelectChat(user)}
              className="chat-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User
                firstName={user.firstName}
                lastName={user.lastName}
                avatar={avatars[user._id]}
                lastMessage={lastMessages[user._id]?.content}
                lastDate={new Date(
                  lastMessages[user._id]?.createdAt
                ).toLocaleString()}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatList;
