import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: {}, // Список повідомлень
    currentChatId: null,
  },
  reducers: {
    setCurrentChat(state, action) {
      state.currentChatId = action.payload; // Устанавливаем текущий chatId
    },
    setMessages(state, action) {
      const { chatId, messages } = action.payload;
      state.messages[chatId] = messages; // Сохраняем сообщения для chatId
    },
  },
});

export const { setCurrentChat, setMessages } = chatSlice.actions;

export default chatSlice.reducer;
