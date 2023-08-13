import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Context, server } from "..";
import "../styles/register.scss";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {isAuthenticated,setIsAuthenticated, loader, setLoader}=useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const { data } = await axios.post(
        `${server}/users/new`,
        { name, email, password },
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
  
  const [hidePass, setHidePass] = useState(false);

  const passVisibility = () => {
    setHidePass(!hidePass);
  };

  if(isAuthenticated) return <Navigate to="/"/>

  return (
    <form onSubmit={submitHandler} className="register">
      <h2>Sign up</h2>
      <div className="input">
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          {" "}
          <input type="checkbox" onClick={passVisibility} /> Show password
        </h6>
        <button type="submit">         
          {(loader)?"Loading...":"Sign Up"}
        </button>
      </div>
      <h4>Already have a account?</h4>
      <Link to="/login">Log In</Link>
    </form>
  );
};

export default Register;
