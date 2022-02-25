const AuthReducer = (state, action) => {
  switch (action.type) {
    case "SIGNING":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "GET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
        isAdmin: action.payload.role === 1 ? true : false,//if isAdmin: res.role === 1 ? true : false from call API useEffect in App.js
      };
    case "UPDATE_AVATAR":
      return {
        ...state,
        user: [{ avatar: action.payload }],
      };
    case "UPDATE_ROLE":
      return {
        ...state,
        isAdmin: true,
      };
    case "SIGNOUT":
      return {
        ...state,
        isLoggedIn: false,
        token: "",
        user: [],
      };
    default:
      return state;
  }
};

export default AuthReducer;
