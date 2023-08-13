import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.scss";
import { Context, server } from "..";
import axios from "axios";
import { toast } from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loader, setLoader } =
    useContext(Context);

  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = async () => {
    setLoader(true);
    try {
      const { data } = await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(false);
      setLoader(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoader(false);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="title">Todo App</div>
      <div className={`navbar__menu ${isOpen ? "active" : ""}`}>
        <ul className="navbar__list">
          <Link className="navbar__item" to={"/"}>
            Home
          </Link>
          <Link className="navbar__item" to={"/profile"}>
            Profile
          </Link>
          {isAuthenticated ? (
            <button
              className="navbar__item"
              disabled={loader}
              onClick={logoutHandler}
            >
              Log Out
            </button>
          ) : (
            <Link className="navbar__item" to={"/login"}>
              Log In
            </Link>
          )}
          {!isAuthenticated && (
            <Link className="navbar__item" to={"/register"}>
              Register
            </Link>
          )}
        </ul>
      </div>
      <div className="navbar__toggle" onClick={handleToggle}>
        <span className={`navbar__icon ${isOpen ? "active" : ""}`} />
        <span className={`navbar__icon ${isOpen ? "active" : ""}`} />
        <span className={`navbar__icon ${isOpen ? "active" : ""}`} />
      </div>
    </nav>
  );
};

export default Header;
