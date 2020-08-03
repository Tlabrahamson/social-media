import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import Axios from "axios";
import ErrorNotice from "../../components/misc/ErrorNotice";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  const submit = async e => {
    e.preventDefault();
    try {
      const newUser = {
        email,
        password,
        passwordCheck,
        displayName
      };
      await Axios.post("http://localhost:5000/users/register", newUser);
      const loginResponse = await Axios.post(
        "http://localhost:5000/users/login",
        { email, password }
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
        <h2>Register</h2>
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <form className="form" onSubmit={submit}>
          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            placeholder="user@email.com"
            type="email"
            autoComplete="off"
            onChange={e => setEmail(e.target.value)}
          />

          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            placeholder="Password"
            type="password"
            autoComplete="off"
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Verify password"
            autoComplete="off"
            onChange={e => setPasswordCheck(e.target.value)}
          />

          <label htmlFor="register-display-name">Display Name</label>
          <input
            id="register-display-name"
            placeholder="Johno Jenkins"
            type="text"
            autoComplete="off"
            onChange={e => setDisplayName(e.target.value)}
          />

          <input type="submit" value="Register" />
        </form>
        <p>
          Already have an account? <Link to="login">Log in!</Link>
        </p>
      </div>
    </div>
  );
}
