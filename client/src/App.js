import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../src/components/body/context/AuthContext";

import Header from "./components/header/Header";
import Body from "./components/body/Body";

function App() {
  const { dispatch, token, isLoggedIn } = useContext(AuthContext);
  //get access_token from global state and localstorage
  useEffect(() => {
    const _appLogin = localStorage.getItem("_appLogin");
    if (_appLogin) {
      const getAccessToken = async () => {
        const res = await axios.post("/user/refresh_token", null);
        // console.log(res);
        dispatch({ type: "GET_TOKEN", payload: res.access_token });
      };
      getAccessToken();
    }
  }, [dispatch, isLoggedIn]);

  //get user data for each person with permission token in global store
  useEffect(() => {
    if (token) {
      const getUserInfor = async () => {
        dispatch({ type: "SIGNING" });
        const res = await axios.get("/user/user_infor", {
          headers: { Authorization: token },
        });
        console.log(res);
        dispatch({ type: "GET_USER", payload: res.user});
      };
      getUserInfor();
    }
  }, [dispatch, token]);

  return (
    <div className="App">
      <Router>
        <Header />
        <Body />
      </Router>
    </div>
  );
}

export default App;
