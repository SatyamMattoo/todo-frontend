import React, { useContext } from "react";
import "../styles/profile.scss";
import { Context } from "..";
import Loader from "../components/Loader";

const Profile = ({ name, email }) => {
  const { user, isAuthenticated, loader } = useContext(Context);
  return loader ? (
    <Loader />
  ) : (
    <div className="profile">
      <h2>Hello, {user?.name}</h2>
      <h2>Email : {user?.email}</h2>
    </div>
  );
};

export default Profile;
