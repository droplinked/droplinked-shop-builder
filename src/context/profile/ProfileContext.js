import { createContext, useReducer, useContext } from "react";
import { ProflieReduser } from "./ProfileReducer";
import { signInViaWallet } from "../../api/base-user/Auth-api";
import {
  showConnect,
  UserSession,
  AppConfig,
  openSignatureRequestPopup,
} from "@stacks/connect";
import { StacksTestnet, StacksMainnet } from "@stacks/network";

const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({ appConfig });

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  //const [profile , setProfile] = useState({})
  const [profile, dispatch] = useReducer(
    ProflieReduser,
    JSON.parse(localStorage.getItem("profile")) || null
  );

  const addProfile = async(payload) => {
    localStorage.setItem("token", JSON.stringify(payload.jwt));
    dispatch({ type: "ADD_PROFILE", payload });
    
  };

  const updateProfile = (payload) => {
    dispatch({ type: "UPDATE_PROFILE", payload });
  };

  const logout = () => {
    let currentShop = JSON.parse(localStorage.getItem("currentShop"));
    dispatch({ type: "LOGOUT" });
    window.location.replace(
      profile.type == "CUSTOMER" ? `/${currentShop}` : "/"
    );
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

  const signinWithaWallet =  () => {
    showConnect({
      appDetails: {
        name: "FLATLAY",
        icon: "https://flatlay.io/assets/images/shared/Flatlay-Logo.svg",
      },
      // redirectTo: "/",
      onFinish: () => {
        const message = userSession.loadUserData().profile.stxAddress.mainnet;
        openSignatureRequestPopup({
          message,
          network: new StacksMainnet(), // for mainnet, `new StacksMainnet()`
          appDetails: {
            name: "FLATLAY",
            icon: "https://flatlay.io/assets/images/shared/Flatlay-Logo.svg",
          },
          onFinish(data) {
            let userDate = {
              stacksAddress:
                userSession.loadUserData().profile.stxAddress.mainnet,
              signature: data.signature,
              publicKey: data.publicKey,
            };
            getUserDataViaWallet(userDate)
          },
        });
      },
      userSession: userSession,
    });
  };

  const getUserDataViaWallet = async(userData) => {
    let result = await signInViaWallet(userData)
   await addProfile(result.data);
    window.location.reload();
  }

  const contextValues = {
    addProfile,
    logout,
    updateProfile,
    isCustomer,
    isRegisteredProducer,
    signinWithaWallet,
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
