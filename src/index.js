import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createContext } from "react";

export const server = "https://todo-backend-0rg6.onrender.com/api/v1";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState();

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loader,
        setLoader,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
