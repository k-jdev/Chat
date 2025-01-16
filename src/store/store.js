import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./features/chatSlice";
import authReducer from "./features/authSlice";
const store = configureStore({
  reducer: {
    chat: chatReducer,
    auth: authReducer,
  },
});

export default store;
