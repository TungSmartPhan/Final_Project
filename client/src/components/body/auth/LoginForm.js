import React, {useState, useContext} from 'react'
import {FcGoogle} from 'react-icons/fc'
import  Input from './input/Input'

import { isEmpty, isEmail, isLength } from "../auth/helper/Validate";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {AuthContext} from "../context/AuthContext";

const initialState = {
  name: '',
  email: '',
  password: ''
};

function LoginForm() {
  const [user, setUser]   = useState(initialState);
  const { email, password } = user;
  const {dispatch} =useContext(AuthContext);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(setUser)
  };

  const login = async (e) => {
    e.preventDefault();
     //use hhelper for validate
     if(isEmpty(email) || isEmpty(password))
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
      const res = await axios.post("/user/login", { email, password });
      localStorage.setItem('_appLogin', true);
      dispatch({ type: "SIGNING"});
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
  }

  //reset after submit
  const handleReset = () =>{
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = '')
    )
    setUser({...user, email: "", password:""})
  }


  return (
    <>
    <ToastContainer/>
    <form className="login" onSubmit={login}>
        {/* Drop down prop into Input so we got */}
      <Input type="email"  text="Email" name="email"  handleChange={handleChange }/>
      <Input type="password"  text="Password" name="password"  handleChange={handleChange }/>
      <div className="login_btn">
          <button type="submit" >Login</button>
          <button className="login_btn-gg">Sign In with Google <FcGoogle/> </button>
      </div>
      </form>
      </>
  )
}

export default LoginForm