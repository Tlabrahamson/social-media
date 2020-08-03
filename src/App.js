// React
import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
// Components
import Navbar from "./components/layout/Navbar";
// Pages
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import EditUserProfile from "./components/pages/EditUserProfile";
// Context
import UserContext from "./context/UserContext";
// Stylesheet
import "./style.css";
// MUI
import { CircularProgress } from "@material-ui/core";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenResponse.data) {
        const userResponse = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token }
        });
        setUserData({
          token,
          user: userResponse.data
        });
      }
    };

    setIsLoading(false);
    checkLoggedIn();
  }, []);

  return isLoading === true ? (
    <div className="center-progress">
      <CircularProgress className="circ-progress" />
    </div>
  ) : (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/edit-profile" component={EditUserProfile} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
