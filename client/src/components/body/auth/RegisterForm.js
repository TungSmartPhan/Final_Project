import React from "react";
import Input from "./input/Input";

const RegisterForm = () => {
  return (
    <form className="login">
      <Input type="text" text="Name" />
      <Input type="text" text="Email" />
      <Input type="password" text="Password" />
      <div className="register_btn">
        <button>Register</button>
      </div>
    </form>
  );
};

export default RegisterForm;

