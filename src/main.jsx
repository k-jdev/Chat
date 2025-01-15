import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="181815207751-r6m9c0387pmi8p9b07qpr7bnr0qaa8im">
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
