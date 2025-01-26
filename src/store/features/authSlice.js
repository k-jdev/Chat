import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../http/api";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        userData
      ); // ✅ Отправляем email + password
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Помилка входу");
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/google-login", { token }); // ✅ Отправляем токен на сервер
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Помилка входу через Google"
      );
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
    try {
      const response = await $api.post("/register", {
        email,
        password,
        firstName,
        lastName,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user; // Берём user из payload
        state.isLoading = null;
        localStorage.setItem("user", JSON.stringify(action.payload)); // Сохраняем весь объект
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user; // Берём user из payload
        state.isLoading = null;
        localStorage.setItem("user", JSON.stringify(action.payload)); // Сохраняем весь объект
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = null;
        state.error = action.error;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
