import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Avatar from "../../images/default-avatar.png";

export default function Home() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) history.push("/login");
  });
  if (userData.user) {
    return (
      <div className="page">
        <div className="profile-card">
          <h2>Welcome back, {userData.user.displayName}</h2>
          <img className="avatar" src={Avatar} alt="Avatar" />
          <h3>{userData.user.userBio}</h3>
          <p>
            We are going to get some stuff cooking here in a bit. For now, how
            about editing your <Link to="edit-profile">profile?</Link>
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="page">
      <h2>Welcome</h2>
    </div>
  );
}
