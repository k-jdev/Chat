import axios from "axios";

export const API_URL = "http://localhost:5000/api";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export const createChat = async (firstName, lastName) => {
  try {
    const response = await axios.post(`${API_URL}/chats`, {
      firstName,
      lastName,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};

export const sendMessage = async (chatId, content, sender, receiver) => {
  try {
    console.log("Відправка повідомлення:", {
      chatId,
      content,
      sender,
      receiver,
    });
    const response = await axios.post(`${API_URL}/messages`, {
      chatId,
      content,
      sender,
      receiver, // Передаємо, але сервер не зберігає
    });
    return response.data;
  } catch (error) {
    console.error("Помилка при відправці повідомлення:", error);
    throw error;
  }
};

export const getMessagesByChat = async (chatId) => {
  try {
    const response = await axios.get(`${API_URL}/messages/${chatId}`);
    return response.data; // Возвращает массив сообщений
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};
export const getLastMessageByChatId = async (chatId) => {
  try {
    const response = await axios.get(`${API_URL}/messages/${chatId}/last`);
    return response.data; // Возвращает последнее сообщение
  } catch (error) {
    console.error("Ошибка при получении последнего сообщения:", error);
    return null;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/chats`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const searchChats = async (searchTerm) => {
  const response = await axios.get(
    `${API_URL}/chats?search=${encodeURIComponent(searchTerm)}`
  );
  return response.data;
};

export const getChatById = async (chatId) => {
  try {
    const response = await axios.get(`${API_URL}/chats/${chatId}`);
    console.log(response);
    return response.data; // Возвращаем объект чата
  } catch (error) {
    console.error("Error fetching chat by ID:", error);
    throw error;
  }
};

export default $api;
