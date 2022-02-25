import React from "react";
import Input from "../auth/input/Input";

const ProfileForm = () => {
  return (
    <form className="login">
        <h3>Name</h3>
      <Input type="text" text="Name" />
      <Input type="text" text="Email" />
      <Input type="password" text="Password" />
      <div className="update_btn">
        <button>Update</button>
      </div>
    </form>
  );
};

export default ProfileForm;