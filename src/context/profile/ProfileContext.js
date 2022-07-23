import { createContext, useReducer ,useContext } from "react";
import { ProflieReduser } from "./ProfileReducer";

export const ProfileContext = createContext();

const ProfileContextProvider = ({ children }) => {
  //const [profile , setProfile] = useState({})
  const [profile, dispatch] = useReducer(ProflieReduser, ( JSON.parse(localStorage.getItem("profile"))) || null);

  
  const addProfile = (payload) => {
    localStorage.setItem("token", JSON.stringify(payload.jwt));
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

export const useProfile = () => {
   
  const ctx = useContext(ProfileContext)

  return {
      ...ctx
  }
}

export default ProfileContextProvider;
