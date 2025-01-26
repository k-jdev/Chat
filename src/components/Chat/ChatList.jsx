import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getUsers, searchChats, getLastMessageByChatId } from "../../http/api";
import { useDispatch } from "react-redux";
import { logout } from "../../store/features/authSlice";
import "../../styles/ChatList.css";
import User from "../User";
import SearchBar from "../SideBar/SearchBar";
import ProfileModal from "./../SideBar/ProfileModal";
import { faker } from "@faker-js/faker";

const ChatList = ({ onSelectChat }) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [lastMessages, setLastMessages] = useState({});
  const [avatarsCache, setAvatarsCache] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let fetchedUsers = searchTerm
          ? await searchChats(searchTerm)
          : await getUsers();

        setUsers(fetchedUsers);

        // Кэшируем аватарки при первом рендере
        const updatedAvatarsCache = { ...avatarsCache };
        fetchedUsers.forEach((user) => {
          if (!updatedAvatarsCache[user._id]) {
            updatedAvatarsCache[user._id] = user.avatar || faker.image.avatar();
          }
        });
        setAvatarsCache(updatedAvatarsCache);

        const lastMessagesData = {};
        await Promise.all(
          fetchedUsers.map(async (user) => {
            const lastMessage = await getLastMessageByChatId(user._id);
            lastMessagesData[user._id] = lastMessage || {
              content: "Повідомлень немає",
              createdAt: "",
            };
          })
        );
        setLastMessages(lastMessagesData);
      } catch (error) {
        setError("Помилка завантаження користувачів");
      }
    };

    fetchUsers();
  }, [searchTerm]);

  const handleSelectChat = (user) => {
    onSelectChat({
      chatId: user._id,
      name: `${user.firstName} ${user.lastName}`,
      avatar: avatarsCache[user._id], // Передаем кэшированную аватарку
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
        <SearchBar onSearch={(term) => setSearchTerm(term)} />
        <button className="profile-button" onClick={toggleModal}>
          Профіль
        </button>
        <ProfileModal
          isVisible={isModalVisible}
          onClose={toggleModal}
          handleLogout={handleLogout}
          user={{ firstName: "Ім'я", lastName: "Користувача" }}
        />
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
                avatar={avatarsCache[user._id]} // Используем кэшированную аватарку
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
