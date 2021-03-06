import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
// MUI
import { CircularProgress } from "@material-ui/core";
// Home image
import HomeImage from "../../images/home-img.png";

export default function Home() {
  const { userData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (userData.user) {
    return isLoading === true ? (
      <div className="center-progress">
        <CircularProgress className="circ-progress" />
      </div>
    ) : (
      <div className="page">
        <div className="profile-card">
          <h2>Welcome back, {userData.user.displayName}</h2>
          <img className="avatar" src={userData.user.avatar} alt="Avatar" />
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
      <div className="home-section">
        <section>
          <h2>Welcome to Social Butterfly!</h2>
          <p>
            Get started by <Link to="register">creating an account.</Link>
          </p>
          <p>
            Already have an account? <Link to="login">Log in!</Link>
          </p>
        </section>
        <img className="home-image" src={HomeImage} alt="Home butterfly" />
      </div>
    </div>
  );
}
