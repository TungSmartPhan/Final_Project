import React, { useState } from "react";
import Input from "../input/Input";
import { isEmpty, isEmail } from "../helper/Validate";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  email: "",
};

const ForgotForm = () => {
  const [user, setUser] = useState(initialState);
  const { email } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const forgot = async (e) => {
    e.preventDefault();
    //use hhelper for validate
    if (isEmpty(email))
      return toast("Please fill in all fields", {
        className: "toast-failded",
        bodyClassName: "toast-failed",
      });

    if (!isEmail(email))
      return toast("Please enter a valid email address", {
        className: "toast-failded",
        bodyClassName: "toast-failed",
      });

    try {
      const res = await axios.post("/user/forgot", { email });
      toast(res.message, {
        className: "toast-success",
        bodyClassName: "toast-success",
      });
      handleReset();
    } catch (error) {
      toast(error.message, {
        className: "toast-failded",
        bodyClassName: "toast-failed",
      });
    }
  };

  //reset field after submit
  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setUser({ ...user, email: "" });
  };

  return (
    <>
      <ToastContainer />
      <form className="login" onSubmit={forgot}>
        <Input
          type="email"
          text="Email"
          name="email"
          handleChange={handleChange}
        />
        <div className="forgot_btn">
          <button>Send</button>
        </div>
      </form>
    </>
  );
};

export default ForgotForm;
