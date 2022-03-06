import React from "react";
import Input from "../auth/input/Input";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { isEmpty, isEmail, isLength } from "../auth/helper/Validate";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  name: "",
  password: "",
};

const ProfileForm = ({ NewAvatar }) => {
  const [userData, setUserData] = useState(initialState);
  const { name, password } = userData;
  const { user, token, dispatch } = useContext(AuthContext);

  const updateInfor = async () => {
    try {
      const res = await axios.patch(
        "/user/user_update",
        {
          name: name ? name : user.name,
          avatar: NewAvatar ? NewAvatar : user.avatar,
        },
        {headers: { Authorization: token }}
      );
      console.log({"tra ve" : res});
      //after update new Infor into database we have to update it into global state
      const getUpdatedUser = await axios.get("/user/user_infor", {
        Headers: { Authorization: token },
      });
      console.log(getUpdatedUser);
      dispatch({ type: "GET_USER", payload: getUpdatedUser.user });
      //response after updated new infor
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

  const updatePassword = async () => {};

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name || NewAvatar) updateInfor();

    if (password) updatePassword();
  };

  return (
    <>
    <ToastContainer/>
    <form className="login" onSubmit={handleSubmit}>
      {/* <h3>Name</h3> */}
      <Input
        type="text"
        text="Name"
        name="name"
        defaultValue={user.name}
        handleChange={handleChange}
      />
      <Input type="text" text="Email" defaultValue={user.email} disabled />
      <Input type="password" text="Password" handleChange={handleChange} />
      <div className="update_btn">
        <button type="submit">Update</button>
      </div>
    </form>
    </>
  );
};

export default ProfileForm;
