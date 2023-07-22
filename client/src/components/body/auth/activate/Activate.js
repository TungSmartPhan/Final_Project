import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Activate = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  const { activation_token } = useParams();
  useEffect(() => {
    //check token
    if (activation_token) {
      const activateUser = async () => {
        try {
          const res = await axios.post('/user/register/activation',{activation_token})
          toast(res.message, {
            className: "toast-success",
            bodyClassName: "toast-success",
          })
        } catch (error) {
          toast(error.message, {
            className: "toast-failded",
            bodyClassName: "toast-failed",
          });
        }
      };
      activateUser();
    }
  }, [activation_token]);



  return (
    <div className="activate__page">
      <ToastContainer/>
      <h2>Activate{toast}</h2>
      <p>
        {" "}
        Ready to login ❤️ 🤗👌<span onClick={handleClick}>Here</span>
      </p>
    </div>
  );
};

export default Activate;
