import { createContext, useReducer, useState,useEffect } from "react";
import axios from "axios";
import AuthReducer from "../context/AuthReducer";
import ProductsAPI from "../api/ProductsAPI";
import UserAPI from "../api/UserAPI";

const INITIAL_STATE = {
  user: [],
  isLoggedIn: false,
  token: "",
  isAdmin: false,
};

export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({ children }) => {
  const [tokenUser, setTokenUser] = useState(false)
  const refreshToken = async () => {
    const res = await axios.post('/user/refresh_token')
    setTokenUser(res.access_token)
  }

  useEffect(() => {
    const firstLogin = localStorage.getItem('_appLogin')
    if(firstLogin) refreshToken()
  },[])

  const APIState =  {
    tokenAPI: [tokenUser, setTokenUser],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(tokenUser),
  };
  console.log(APIState);
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        token: state.token,
        isAdmin: state.isAdmin,
        APIState,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
