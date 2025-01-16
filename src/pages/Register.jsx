import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, googleLogin } from "../store/features/authSlice"; // ✅ Добавляем googleLogin
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "../styles/Register.module.css";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      alert("Будь ласка, заповніть усі поля!");
      return;
    }

    const result = await dispatch(register(formData));
    if (register.fulfilled.match(result)) {
      navigate("/");
    }
  };

  const handleGoogleSuccess = async (response) => {
    const token = response.credential;
    dispatch(googleLogin(token)).then((result) => {
      if (googleLogin.fulfilled.match(result)) {
        navigate("/"); // ✅ Перенаправление при успехе
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
      <h2 className={styles.title}>Реєстрація</h2>
      <form onSubmit={handleRegister} className={styles.form}>
        <motion.input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Ім'я"
          className={styles.input}
          whileFocus={{ scale: 1.05 }}
        />
        <motion.input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Фамілія"
          className={styles.input}
          whileFocus={{ scale: 1.05 }}
        />
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
          {isLoading ? "Реєструємо..." : "Зареєструватись"}
        </motion.button>

        <div className={styles.googleLogin}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log("Google Login Failed")}
          />
        </div>

        {error && <p className={styles.error}>{error.message}</p>}
      </form>
    </motion.div>
  );
}

export default Register;
