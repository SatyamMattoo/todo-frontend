import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../styles/login.scss";
import { Context, server } from "..";

import { toast } from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [hidePass, setHidePass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loader, setLoader } =
    useContext(Context);

  if (isAuthenticated) return <Navigate to="/" />;

  const passVisibility = () => {
    setHidePass(!hidePass);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const { data } = await axios.post(
        `${server}/users/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoader(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoader(false);
    }
  };

  return (
    <form className="login" onSubmit={submitHandler}>
      <h2>Log In</h2>
      <div className="input">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={hidePass ? "text" : "password"}
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <h6>
          <input type="checkbox" onClick={passVisibility} /> Show password
        </h6>
        <button type="submit">
          {(loader)?"Loading...":"Log In"}
        </button>
      </div>
      <h6>or</h6>
      <h3>Create a account</h3>
      <Link to="/register">Register</Link>
    </form>
  );
};

export default Login;
