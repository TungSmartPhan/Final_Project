import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import Input from "./input/Input";

import { isEmpty, isEmail, isLength } from "../auth/helper/Validate";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import GoogleLogin from "react-google-login";

const initialState = {
  name: "",
  email: "",
  password: "",
};

function LoginForm() {
  const [user, setUser] = useState(initialState);
  const { email, password } = user;
  const { dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    //use hhelper for validate
    if (isEmpty(email) || isEmpty(password))
      return toast("Please fill in all fields", {
        className: "toast-failded",
        bodyClassName: "toast-failed",
      });

    if (!isEmail(email))
      return toast("Please enter a valid email address", {
        className: "toast-failded",
        bodyClassName: "toast-failed",
      });

    if(isLength(password))
      return toast("Password must be at least 6 characters", {
        className: "toast-failded",
        bodyClassName: "toast-failed",
      });

    try {
      const res = await axios.post("/user/login", { email, password });
      localStorage.setItem("_appLogin", true);
      dispatch({ type: "SIGNING" });
      toast(res.message, {
        className: "toast-success",
        bodyClassName: "toast-success",
      });
    } catch (error) {
      toast(error.message, {
        className: "toast-failded",
        bodyClassName: "toast-failed",
      });
      console.log(error);
    }
    // handleReset();
  };

  //reset after submit
  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setUser({ ...user, email: "", password: "" });
  };

  //define google function
  const googleSuccess = async (res) => {
    //need google id
    // if the google sign-in was a success -> gooogle will give us a token id and we want to get that first
    const GGtoken = res?.tokenId;
    try {
      //call endpoint
      await axios.post("/user/google_login", { tokenId: GGtoken });
      localStorage.setItem("_appLogin", true);
      dispatch({ type: "SIGNING" });
      toast(res.message, {
        className: "toast-success",
        bodyClassName: "toast-success",
      });
    } catch (error) {
      toast(error.message, {
        className: "toast-failded",
        bodyClassName: "toast-failed",
      });
    }
  };

  const googleError = () => {
    toast("There was an error signing in, please try again later", {
      className: "toast-failded",
      bodyClassName: "toast-failed",
    });
  };
  return (
    <>
      <ToastContainer />
      <form className="login" onSubmit={login}>
        {/* Drop down prop into Input so we got */}
        <Input
          type="email"
          text="Email"
          name="email"
          handleChange={handleChange}
        />
        <Input
          type="password"
          text="Password"
          name="password"
          handleChange={handleChange}
        />
        <div className="login_btn">
          <button type="submit">Login</button>
          <GoogleLogin
            clientId={process.env.REACT_APP_G_MAILING_SERVICE_CLIENT_ID}
            render={(renderProps) => (
              <button
                className="login_btn-gg"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Sign In with Google <FcGoogle />{" "}
              </button>
            )}
            cookiePolicy={"single_host_origin"}
            onSuccess={googleSuccess}
            onFailure={googleError}
          />
        </div>
      </form>
    </>
  );
}

export default LoginForm;

