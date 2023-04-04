// import { StacksTestnet, StacksMainnet } from "@stacks/network";
// import {
//   showConnect,
//   UserSession,
//   AppConfig,
//   openSignatureRequestPopup,
// } from "@stacks/connect";


// const appConfig = new AppConfig(["store_write", "publish_data"]);
// export const userSession = new UserSession({ appConfig });

// export const signinViaHirowallet = async (profile , submitFunction) => {

//  showConnect({
//     appDetails: {
//       name: "droplinked",
//       icon: "https://droplinked.com/Vector.png",
//     },
//     // redirectTo: "/",
//     onFinish: () => {
//       const message = userSession.loadUserData().profile.stxAddress.mainnet;
//       openSignatureRequestPopup({
//         message,
//         network: new StacksMainnet(),// for mainnet, `new StacksMainnet()`
//         appDetails: {
//           name: "droplinked",
//           icon: "https://droplinked.com/Vector.png",
//         },
//         onFinish(data) {
//           let userDate = {
//             stacksAddress:
//               userSession.loadUserData().profile.stxAddress.mainnet,
//             signature: data.signature,
//             publicKey: data.publicKey,
//             email: profile && profile.email ? profile.email : "",
//           };
//            getUserDataViaWallet(userDate ,submitFunction);
//         },
//       });
//     },
//     userSession: userSession,
//   })
// };

// const getUserDataViaWallet = async (userData , submitFunction) => {
//   let result = await signInViaWallet(userData);
//   if (result.status == "success") submitFunction(result.data);
//   else {
//     userSession.signUserOut(window.location.pathname);
//    // errorToast(result);
//   }
// };
