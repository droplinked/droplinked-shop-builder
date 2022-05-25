import { createContext, useReducer } from "react";
import { ProflieReduser } from "./ProfileReducer";
import { useState , useEffect } from "react";

export const ProfileContext = createContext();

const ProfileContextProvider = ({ children }) => {
  //const [profile , setProfile] = useState({})
  const [profile, dispatch] = useReducer(ProflieReduser, ( JSON.parse(localStorage.getItem("profile"))) || null);

  const addProfile = (payload) => {
    dispatch({ type: "ADD_PROFILE", payload });
  };

  const updateProfile = (payload) => {
    dispatch({ type: "UPDATE_PROFILE", payload });
  };

  const logout = () => {
    dispatch({type:"LOGOUT"});
    window.location.replace('/');
  };

  const contextValues = {
    addProfile,
    logout,
    updateProfile,
    profile,
  };

  return (
    <ProfileContext.Provider value={contextValues}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
