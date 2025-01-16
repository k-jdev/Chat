import React from "react";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  return (
    <div>
      <h2>Login</h2>
      <form action="">
        <div>
          <label htmlFor="email">Введіть email</label>
          <input type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Введіть пароль</label>
          <input type="password" id="password" />
        </div>
        <button type="submit">Увійти</button>
      </form>
      <p>
        Увійти за допомогою:
        {
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              alert("Login Failed");
            }}
          />
        }
      </p>
    </div>
  );
}

export default Login;
