import { createContext, useReducer, useState } from "react";
import AuthReducer from "../context/AuthReducer";
import ProductsAPI from "../api/ProductsAPI";

const INITIAL_STATE = {
  user: [],
  isLoggedIn: false,
  token: "",
  isAdmin: false,
};

export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({ children }) => {
  const ProductState = {
    productsAPI:ProductsAPI(),
  }
  console.log(ProductState)
  // ProductsAPI();
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        token: state.token,
        isAdmin: state.isAdmin,
        ProductState,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
