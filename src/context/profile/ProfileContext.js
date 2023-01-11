// import { createContext, useReducer, useContext } from "react";
// import { ProflieReduser } from "./ProfileReducer";
// import { signInViaWallet } from "../../api/base-user/Auth-api";
// import { getProfileData } from "../../api/base-user/Profile-api";
// import {
//   showConnect,
//   UserSession,
//   AppConfig,
//   openSignatureRequestPopup,
// } from "@stacks/connect";
// import { useToasty } from "../toastify/ToastContext";
// import { PROFILE_STATUS } from "../../constant/profile-status-types";
// import { StacksTestnet, StacksMainnet } from "@stacks/network";

// const appConfig = new AppConfig(["store_write", "publish_data"]);
// export const userSession = new UserSession({ appConfig });

// export const ProfileContext = createContext();

// const ProfileProvider = ({ children }) => {
//   //const [profile , setProfile] = useState({})
//   const [profile, dispatch] = useReducer(
//     ProflieReduser,
//     JSON.parse(localStorage.getItem("profile")) || null
//   );
//   const { errorToast } = useToasty();

//   const addProfile = (payload) => {
//     dispatch({ type: "ADD_PROFILE", payload });
//   };

//   // this function reload page
//   const addProfileViaWallet = (payload) => {
//     addProfile(payload);
//     window.location.reload();
//   };

//   const updateProfile = (payload) => {
//     dispatch({ type: "UPDATE_PROFILE", payload });
//   };

//   const updateProfileData = async () => {
//     let result = await getProfileData();
//     updateProfile(result.data.user);
//   };

//   const logout = () => {
//     let currentShop = JSON.parse(localStorage.getItem("currentShop"));
//     dispatch({ type: "LOGOUT" });
//     window.location.replace(
//       profile.type == "CUSTOMER" ? `/${currentShop}` : "/"
//     );
//   };

//   const isCustomer = () => {
//     if (profile) {
//       if (profile.type == "CUSTOMER") return true;
//       else return false;
//     }
//   };

//   const isRegisteredProducer = () => {
//     if (profile) {
//       if (
//         profile.type == "PRODUCER" &&
//         (profile.status == PROFILE_STATUS.IMS_TYPE_COMPLETED ||
//           profile.status == PROFILE_STATUS.ACTIVE)
//       ) {
//         return true;
//       } else {
//         return false;
//       }
//     }
//   };

//   const signinWithaWallet = () => {
//     showConnect({
//       appDetails: {
//         name: "droplinked",
//         icon: "https://droplinked.com/Vector.png",
//       },
//       // redirectTo: "/",
//       onFinish: () => {
//         const message = userSession.loadUserData().profile.stxAddress.mainnet;
//         openSignatureRequestPopup({
//           message,
//           network: new StacksMainnet(), // for mainnet, `new StacksMainnet()`
//           appDetails: {
//             name: "droplinked",
//             icon: "https://droplinked.com/Vector.png",
//           },
//           onFinish(data) {
//             let userDate = {
//               stacksAddress:
//                 userSession.loadUserData().profile.stxAddress.mainnet,
//               signature: data.signature,
//               publicKey: data.publicKey,
//               email: profile && profile.email ? profile.email : "",
//             };
//            // getUserDataViaWallet(userDate);
//             return "test"
//           },
//         });
//       },
//       userSession: userSession,
//     });
//   };

//   const getUserDataViaWallet = async (userData) => {
//     let result = await signInViaWallet(userData);
//     if (result.status == "success") addProfileViaWallet(result.data);
//     else {
//       userSession.signUserOut(window.location.pathname);
//       errorToast(result);
//     }
//   };

//   const contextValues = {
//     addProfile,
//     logout,
//     updateProfile,
//     isCustomer,
//     isRegisteredProducer,
//     signinWithaWallet,
//     updateProfileData,
//     profile,
//   };

//   return (
//     <ProfileContext.Provider value={contextValues}>
//       {children}
//     </ProfileContext.Provider>
//   );
// };

// export const useProfile = () => {
//   const ctx = useContext(ProfileContext);

//   return {
//     ...ctx,
//   };
// };

// export default ProfileProvider;
