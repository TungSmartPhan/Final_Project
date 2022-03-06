import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import Login from "./auth/Login";
// import ForgotForm from '../body/auth/forgot/ForgotForm'
import Reset from "./auth/reset/Reset";
import Activate from "./auth/activate/Activate";
import NotFound from "./notfound/NotFound";
import Profile from "./profile/Profile"
import { AuthContext } from "../body/context/AuthContext";

function Body() {
  const auth = useContext(AuthContext);
  const { isLoggedIn } = auth;
  
  return (
    <section>
      <Routes>
        {/* <Route path="/" > */}
        <Route 
          path="user/login"
          element={ isLoggedIn ? <Profile/> : <Login />}
        />
        {/* <Route path="user/profile" element={<Profile/>}/> */}
        {/* <Route path="user/forgot_password" element={<ForgotForm/>}/> */}
        <Route path="user/reset/:token" element={<Reset />} />
        <Route
          path="user/activate/:activation_token"
          element={<Activate />} //must same the path of Gmail
        />
       
        {/* </Route> */}
      </Routes>
    </section>
  );
}

export default Body;
