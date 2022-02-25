import { createContext, useReducer } from "react";
import AuthReducer from "../context/AuthReducer";

const INITIAL_STATE = {
  user: [],
  isLoggedIn: false,
  token: "",
  isAdmin: false
};

export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return ( 
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        token: state.token,
        isAdmin: state.isAdmin,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
