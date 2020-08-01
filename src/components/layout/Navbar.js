import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";
import Logo from "../../images/social-butterfly.png";

export default function Header() {
  return (
    <header id="header">
      <Link to="/">
        <div>
          <img src={Logo} alt="Social Butterfly" />
          <h1 className="title">Social Butterfly</h1>
        </div>
      </Link>
      <AuthOptions />
    </header>
  );
}
