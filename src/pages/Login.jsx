import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, googleLogin } from "../store/features/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "../styles/Login.module.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Будь ласка, заповніть усі поля!");
      return;
    }

    const result = await dispatch(login(formData));
    if (login.fulfilled.match(result)) {
      const user = result.payload; // Данные пользователя
      localStorage.setItem("user", JSON.stringify(user)); // Сохраняем в localStorage
      navigate("/");
    }
  };

  const handleGoogleSuccess = async (response) => {
    const token = response.credential;
    dispatch(googleLogin(token)).then((result) => {
      if (googleLogin.fulfilled.match(result)) {
        const user = result.payload;
        localStorage.setItem("user", JSON.stringify(user)); // Сохраняем Google пользователя
        navigate("/");
      }
    });
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={styles.title}>Вхід</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        <motion.input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className={styles.input}
          whileFocus={{ scale: 1.05 }}
        />
        <motion.input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Пароль"
          className={styles.input}
          whileFocus={{ scale: 1.05 }}
        />

        <motion.button
          type="submit"
          className={styles.button}
          disabled={isLoading}
          whileHover={{ scale: 1.1 }}
        >
          {isLoading ? "Входимо..." : "Увійти"}
        </motion.button>

        <div className={styles.googleLogin}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log("Google Login Failed")}
          />
        </div>

        {error && <p className={styles.error}>{error.message}</p>}

        <p className={styles.switchText}>
          Немає акаунта?
          <motion.button
            className={styles.switchButton}
            onClick={() => navigate("/register")}
            whileHover={{ scale: 1.1 }}
          >
            Зареєструватися
          </motion.button>
        </p>
      </form>
    </motion.div>
  );
}

export default Login;
