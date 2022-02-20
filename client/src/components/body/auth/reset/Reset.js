import React from "react";
import { useState } from "react";
import logoSecure from "../../../assets/img/security-svgrepo-com.png";
import ResetForm from "./ResetForm";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/user/login");
  };

  return (
    <div className="reset__page">
      <h2>Reset Password</h2>
      {/* logo */}
      <div className="reset__page-logo">
        <img src={logoSecure} alt="logo" />
      </div>
      {/* form */}
      <ResetForm />
      {/* action */}
      <p className="reset__p" onClick={handleClick}>
        Login ?
      </p>
    </div>
  );
};

export default Reset;
