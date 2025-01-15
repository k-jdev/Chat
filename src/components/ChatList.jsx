import React, { useState, useEffect } from "react";
import "../styles/ChatList.css";
import { getUsers, searchChats } from "../http/api";
import { faker } from "@faker-js/faker";
import SearchBar from "./SideBar/SearchBar";

function ChatList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let fetchedUsers;
        if (searchTerm) {
          fetchedUsers = await searchChats(searchTerm);
        } else {
          fetchedUsers = await getUsers();
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
      <SearchBar onSearch={(term) => setSearchTerm(term)} />

      <h2>Chats</h2>
      {error && <div className="error">{error}</div>}
      {users.length === 0 && !error ? <div>No users available</div> : null}
      {Array.isArray(users) && users.length > 0 ? (
        users.map((user) => (
          <div className="user-card" key={user._id}>
            <img
              src={user.avatar || faker.image.avatar()}
              alt={`${user.firstName || "Unknown"}'s avatar`}
              className="avatar"
            />
            <div className="user-info">
              <p className="user-name">{user.firstName || "No Name"}</p>
              <p className="user-message">
                {user.updatedAt || "No messages yet"}
              </p>
            </div>
            <p className="user-date">{user.lastDate || " "}</p>
          </div>
        ))
      ) : (
        <div>No users available</div>
      )}
    </div>
  );
}

export default ChatList;
