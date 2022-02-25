import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";

import axios from "axios";
import { AuthContext } from "../body/context/AuthContext";

function Header() {
  const auth = useContext(AuthContext);
  const { user, isLoggedIn } = auth;
  console.log(auth);

  const userLink = () => {
    return (
      <li>
        <Link>
          <div className="avatar">
            <img src={user.avatar} alt="user_avatar" />
            <span> {user.name}</span>
          </div>
        </Link>
      </li>
    );
  };

  return (
    <header className="container">
      <div className="wrapper">
        <nav className="navbar">
          {/* <!-- logo --> */}
          <div className="navbar__logo">
            <img src={logo} alt="logo" />
            <p>Covida-19 </p>
          </div>
          {/* <!-- links --> */}
          <ul className="navbar__links">
            <li className="navbar__link">
              <Link to="/">
                <i className="fa-solid fa-cart-shopping"></i>
                <h3 href="#banner">Shopping</h3>
              </Link>
            </li>
            <li className="navbar__link">
              <Link to="user/login">
                <i className="fa-solid fa-user"></i>
                {
                  //change icon when loggin | Global State AuthContext will check it
                  
                }
                <h3 href="#contagion">Sign In</h3>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
