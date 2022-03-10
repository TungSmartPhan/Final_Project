import { useRef, useState, useContext } from "react";
import ProfileForm from "../profile/ProfileForm";
import AvatarProfile from "./avatar/AvatarProfile";
// import { AiFillCamera } from "react-icons";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const inputFile = useRef(null);

  const handleInput = () => {
    inputFile.current.click();
  };

  const [NewAvatar, setNewAvatar] = useState(false);
  const { token } = useContext(AuthContext);

  const changeAvatar = async (event) => {
    event.preventDefault();
    try {
      //get file from user input
      const file = event.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      console.log(formData.get('file'))
      //upload  to cloudinary
      const res = await axios.post("/api/user/avatar_upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
        onUploadProgress: (x) => {
          if (x.total < 1024000)
            return toast(res.message, {
              className: "toast-success",
              bodyClassName: "toast-success",
              autoClose: 7000,
            });
        },
      });
      setNewAvatar(res.url);
      console.log(res);
    } catch (error) {
      console.log(error.response);
      toast(error.message, {
        className: "toast-failded",
        bodyClassName: "toast-failed",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="profile__page">
        <h3>Update Your Profile</h3>
        {/* avatar */}
        <div className="profile__avatar">
          <div className="profile__avatar-wrapper" onClick={handleInput}>
            <AvatarProfile avatar={NewAvatar} />
            {/* <AiFillCamera /> */}
            <i className="fa-solid fa-camera"></i>
          </div>
          <input
            type="file"
            name="file"
            ref={inputFile}
            onChange={changeAvatar}
          />
        </div>
        <div className="profile__content-profile">
          {/* feed */}
          {/* profile form */}
          <ProfileForm avatar={NewAvatar} />
        </div>
      </div>
    </>
  );
};
export default Profile;
