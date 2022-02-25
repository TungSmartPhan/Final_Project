import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../../img/logo.png";
import Avatar from "../avatar/Avatar";

function AppBar() {
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
                <a href="#banner">Shopping</a>
              </Link>
            </li>
            <li className="navbar__link">
              <Link to="/">
                <i class="fa-solid fa-user"></i>
                <a href="#contagion">Sign out</a>
              </Link>
            </li>

            <li>
              {/* avatar */}
              <Avatar />
            </li>
            <li>
              <h2>User</h2>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AppBar;
