import { useNavigate } from "react-router-dom";

const Activate = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/user/login");
  };
  return (
    <div className="activate__page">
      <h2>Activate Successfully</h2>
      <p>
        {" "}
        Ready to login ❤️ 🤗👌<span onClick={handleClick}>Here</span>
      </p>
    </div>
  );
};

export default Activate;
