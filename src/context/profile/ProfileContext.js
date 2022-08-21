import { createContext, useReducer, useContext } from "react";
import { ProflieReduser } from "./ProfileReducer";

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  //const [profile , setProfile] = useState({})
  const [profile, dispatch] = useReducer(
    ProflieReduser,
    JSON.parse(localStorage.getItem("profile")) || null
  );

  const addProfile = (payload) => {

    localStorage.setItem("token", JSON.stringify(payload.jwt));
    dispatch({ type: "ADD_PROFILE", payload });
  };

  const updateProfile = (payload) => {
    dispatch({ type: "UPDATE_PROFILE", payload });
  };

  const logout = () => {
    let currentShop = JSON.parse(localStorage.getItem("currentShop"))
    dispatch({ type: "LOGOUT" });
    window.location.replace((profile.type == "CUSTOMER") ? `/${currentShop}` :"/");
  };

  const isCustomer = () => {
    if (profile) {
      if (profile.type == "CUSTOMER") return true;
      else return false;
    }
  };

  const isRegisteredProducer = () => {
    if (profile) {
      if (
        profile.type == "PRODUCER" &&
        profile.status == "IMS_TYPE_COMPLETED"
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const contextValues = {
    addProfile,
    logout,
    updateProfile,
    isCustomer,
    isRegisteredProducer,
    profile,
  };

  return (
    <ProfileContext.Provider value={contextValues}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);

  return {
    ...ctx,
  };
};

export default ProfileProvider;
