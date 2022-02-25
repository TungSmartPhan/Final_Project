import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./auth/Login";
import Reset from "./auth/reset/Reset";
import Activate from "./auth/activate/Activate";


function Body() {
  
  return (
    <section>
      <Routes>
        {/* <Route path="" element={<Header />} /> */}
        <Route
          path="user/login"
          element={<Login />}
        />
        <Route path="user/reset/:token" element={<Reset />} />
        <Route
          path="user/activate/:activation_token"
          element={<Activate />} //must same the path of Gmail
        />
      </Routes>
    </section>
  );
}

export default Body;
