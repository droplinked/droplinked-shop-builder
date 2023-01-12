// import { useState, createContext, useContext, useEffect } from "react";
// //import { authenticate } from "../../services/wallet-auth/auth";
// import { userSession } from "../../utils/hirowallet/hirowallet-utils";

// const UserWalletContext = createContext(undefined);

// const WalletProvider = ({ children }) => {
//   const [userData, setUserData] = useState(undefined);
//  console.log('userData ' , userData.profile.stxAddress.mainnet);
//   useEffect(() => {
//     if (userSession.isSignInPending()) {
//       userSession
//         .handlePendingSignIn()
//         .then((userData) => {
//           window.history.replaceState({}, document.title, "/");
//           setUserData(userData);
//         })
//         .catch((err) => {
//           setUserData(undefined);
//         });
//     } else if (userSession.isUserSignedIn()) {
//       setUserData(userSession.loadUserData());
//     }
//   }, []);

//   // change path instead "/"
//   function onSignOut() {
//     userSession.signUserOut(window.location.pathname);
//   }

//   function checkTokens(tokens) {
//     tokens.filter((value) => value.includes("crashpunks"));
//     return tokens.length;
//   }

//   function getStxAddress() {
//     if (userData) {
//       return userData.profile.stxAddress.mainnet;
//     } else {
//       return null;
//     }
//   }

//   return (
//     <UserWalletContext.Provider
//       value={{ onSignOut, checkTokens, userData, getStxAddress }}
//     >
//       {children}
//     </UserWalletContext.Provider>
//   );
// };

// const UseWalletInfo = () => useContext(UserWalletContext);

// export { WalletProvider, UseWalletInfo };
