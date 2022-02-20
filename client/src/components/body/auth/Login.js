import React from "react";
import { useState } from "react";
import logoAuth from "../../assets/img/ringed-planet@3x.png";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotForm from "../auth/forgot/ForgotForm";

function Login() {
  const [login, setLogin] = useState(true);
  const [register, setRegister] = useState(false);
  const [forgot, setForgot] = useState(false);

  const handleLogin = () => {
    setLogin(true);
    setRegister(false);
    setForgot(false);
  };

  const handleRegister = () => {
    setLogin(false);
    setRegister(true);
    setForgot(false);
  };

  const handleForgot = () => {
    setLogin(false);
    setRegister(false);
    setForgot(true);
  };

  return (
    <div className="login__page">
      <h2>Login</h2>

      {/* {Logo} */}
      <div className="login__page-logo">
        <img src={logoAuth} alt="logo" />
      </div>

      {/* {Form} */}
      {login && <LoginForm />}
      {register && <RegisterForm />}
      {forgot && <ForgotForm />}

      {/* action */}
      <div className="login__page__actions">
        <p className="login__page__actions-l" onClick={login ? handleRegister : handleLogin}>{login ? "Register?" : "Login?"}</p>
        <p className="login__page__actions-r" onClick={handleForgot}>Forgot Password ?</p>
      </div>
    </div>
  );
}

export default Login;
