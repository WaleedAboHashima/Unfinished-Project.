import { Provider } from "react-redux";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./features/store";
import { AuthProvider } from "react-auth-kit";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider authType={"cookie"} authName={'_auth'} cookieSecure={false} cookieDomain={window.location.hostname}>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
);
