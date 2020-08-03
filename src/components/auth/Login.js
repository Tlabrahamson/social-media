import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../../components/misc/ErrorNotice";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async e => {
    e.preventDefault();
    try {
      const loginUser = {
        email,
        password
      };
      const loginResponse = await Axios.post(
        "http://localhost:5000/users/login",
        loginUser
      );
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="page">
      <div className="profile-card">
        <h2>Login</h2>
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <form className="form" onSubmit={submit}>
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            placeholder="Your email address"
            type="email"
            autoComplete="off"
            onChange={e => setEmail(e.target.value)}
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            placeholder="Your password"
            type="password"
            autoComplete="off"
            onChange={e => setPassword(e.target.value)}
          />

          <input type="submit" value="Login" />
        </form>
        <p>
          Don't have an account yet? <Link to="register">Register!</Link>
        </p>
      </div>
    </div>
  );
}
