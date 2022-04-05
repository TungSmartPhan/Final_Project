import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";

import axios from "axios";
import { AuthContext } from "../body/context/AuthContext";

function Header() {
  const auth = useContext(AuthContext);
  const { dispatch, user, isLoggedIn, isAdmin } = auth;
  const [cart] = auth.APIState.userAPI.cart;
  console.log(auth);


  const handleLogout = async (e) => {
    // e.preventDefault(); i want to refresh the page so e = event i dont need that anymore
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("_appLogin");
      dispatch({ type: "SIGNOUT" });
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      window.location.href = "/";
    }
  };

  const userLink = () => {
    return (
      <>
        <div className="avatar">
          <Link to="/user/profile">
            <img src={user.avatar} alt="avatar" />
            <h3>
              {" "}
              Hello! {isAdmin ? " Admin" : null} {user.name}{" "}
              <i className="fa-solid fa-arrow-down"></i>{" "}
            </h3>
          </Link>
          <ul className="dropdown">
            <li>
              <Link to="/user/profile">Profile</Link>
            </li>
            {isAdmin ? adminLink() : null}
            <li>
              <Link to="/history">History</Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </>
    );
  };

  const adminLink = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Products</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  return (
    <header className="container">
      <div className="wrapper">
        <nav className="navbar">
          {/* <!-- logo --> */}
          <div className="navbar__logo">
            <img src={logo} alt="logo" />
            <p>Covida-19 😒 Suri </p>
          </div>
          {/* <!-- links --> */}
          <ul className="navbar__links">
            <li className="navbar__link">
              <Link to="/">
                <i className="fa-solid fa-cart-shopping"></i>
                <h3 href="#banner">Shopping</h3>
              </Link>
            </li>
            <li>
              {isAdmin ? (
                " "
              ) : (
                <div className="cart-icon">
                  <span>{cart.length}</span>
                  <Link to="/cart">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </Link>
                </div>
              )}
            </li>
            <li className="navbar__link">
              {
                //change icon when loggin | Global State AuthContext will check it after Logined
                isLoggedIn ? (
                  userLink()
                ) : (
                  <div>
                    <i className="fa-solid fa-user"></i>
                    <Link to="user/login">
                      <h3 href="#contagion">Sign In</h3>
                    </Link>
                  </div>
                )
              }
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
