import AppBar from "./appbar/AppBar";
import ProfileForm from "../profile/ProfileForm"
const Profile = () => {
  return (
    <div className="profile__page">
      {/* navbar : AppBar */}
      <AppBar />
      {/* sidebar */}
      {/* {content} */}
      <div className="profile__content">
        {/* feed */}
        {/* profile form */}
        <ProfileForm />
      </div>
    </div>
  );
};
export default Profile;
