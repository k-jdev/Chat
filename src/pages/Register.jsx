import React from "react";
import { GoogleLogin } from "@react-oauth/google";

function Register() {
  return (
    <div>
      <h2>Register</h2>
      <form action="">
        <div>
          <label htmlFor="name">Введіть ім'я</label>
          <input type="text" id="name" />
        </div>
        <div>
          <label htmlFor="email">Введіть email</label>
          <input type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Введіть пароль</label>
          <input type="password" id="password" />
        </div>
        <button type="submit">Зареєструватися</button>
      </form>
      <p>
        Зареєструватися за допомогою:
        {
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        }
      </p>
    </div>
  );
}

export default Register;
