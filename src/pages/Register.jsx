import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/features/authSlice";
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

    const result = await dispatch(register(formData)); // Додано await
    if (register.fulfilled.match(result)) {
      const user = result.payload; // Данні користувача
      localStorage.setItem("user", JSON.stringify(user)); // Збереження в localStorage
      navigate("/"); // Перенаправлення після успішної реєстрації
    } else {
      console.error("Registration failed:", result.error.message);
    }
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

        {error && <p className={styles.error}>{error.message}</p>}

        <p className={styles.switchText}>
          Уже зареєстровані?
          <motion.button
            className={styles.switchButton}
            onClick={() => navigate("/login")}
            whileHover={{ scale: 1.1 }}
          >
            Увійти
          </motion.button>
        </p>
      </form>
    </motion.div>
  );
}

export default Register;
