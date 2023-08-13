import React, { useContext } from "react";
import "../styles/profile.scss";
import { Context } from "..";
import Loader from "../components/Loader";

const Profile = () => {
  const { user, isAuthenticated, loader } = useContext(Context);
  return isAuthenticated ? (
    loader ? (
      <Loader />
    ) : (
      <div className="profile">
        <h2>Hello, {user?.name}</h2>
        <h2>Email : {user?.email}</h2>
      </div>
    )
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgba(15, 15, 15, 0.979)",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        fontSize: "2rem",
        fontWeight: "700",
      }}
    >
      Please Log In first to see profile Details
    </div>
  );
};

export default Profile;
