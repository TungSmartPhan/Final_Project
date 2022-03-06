import React, { useState } from "react";
import { BrowserRouter as useParam} from 'react-router-dom'
import  Input from '../input/Input'
import { isEmpty, isLength } from "../helper/Validate";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  password: "",
};

function ResetForm() {
  const [user, setUser] = useState(initialState);
  const { password } = user;
  const {token} = useParam();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const reset = async (e) => {
    e.preventDefault();
    //use hhelper for validate
    if(isEmpty(password))
      return toast("Please fill in your new password", {
        className: "toast-failded",
        bodyClassName: "toast-failed",
      });

      if(isLength(password))
      return toast("Password must be at least 6 characters", {
        className: "toast-failded",
        bodyClassName: "toast-failed",
      });



    try {
      const res = await axios.post("/user/reset", { password },{headers:{Authorization: token}});
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

    //reset after submit
    const handleReset = () =>{
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = '')
      )
      setUser({...user, password:""})
    }
  

  return (
    <>
    <ToastContainer/>
    <form className="login" onSubmit={reset}>
        {/* Drop down prop into Input so we got */}
      <Input type="password"  text="Password"  name="password"  handleChange={handleChange }/>
      <div className="login_btn">
          <button type='submit'>Reset</button>
      </div>
      </form>
    </>
    
  )
}

export default ResetForm
