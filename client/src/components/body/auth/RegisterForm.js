import React, { useState } from "react";
import Input from "./input/Input";
import { isEmpty, isEmail, isLength } from "../auth/helper/Validate";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  name: '',
  email: '',
  password: ''
};

const RegisterForm = () => {
  const [user, setUser]   = useState(initialState);
  const { name, email, password } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  };

  const register = async (e) => {
    e.preventDefault();
    //use hhelper for validate
    if(isEmpty(name) || isEmpty(password))
      return toast("Please fill in all fields", {
        className: "toast-failded",
        bodyClassName: "toast-failed",
      });

    if(!isEmail(email))
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
      const res = await axios.post("/user/register", { name, email, password });
      toast(res.message, {
        className: "toast-success",
        bodyClassName: "toast-success",
      })
    } catch (error) {
      toast(error.message, {
        className: "toast-failded",
        bodyClassName: "toast-failed",
      });
      console.log(error)
    }
    handleReset();
  };

  //reset after submit
  const handleReset = () =>{
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = '')
    )
    setUser({...user, name: "", email: "", password:""})
  }

  return (
    <>
    <ToastContainer/>
    <form className="login" onSubmit={register}>
      <Input type="text" text="Name" name="name" handleChange={handleChange }/>
      <Input type="text" text="Email" name="email"  handleChange={handleChange }/>
      <Input type="password" text="Password" name="password" handleChange={handleChange } />
      <div className="register_btn">
        <button type="submit" >Register</button>
      </div>
    </form>
    </>
  );
};

export default RegisterForm;

