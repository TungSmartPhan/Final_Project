import React from "react";
import Input from "../input/Input"

const ForgotForm = () => {
  return (
    <form className="login">
      <Input type="email" text="Email" />
      <div className="forgot_btn">
        <button>Send</button>
      </div>
    </form>
  );
};

export default ForgotForm;