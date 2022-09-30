import {
  showConnect,
  UserSession,
  AppConfig,
  openSignatureRequestPopup,
} from "@stacks/connect";
import { StacksTestnet } from "@stacks/network";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

// export const authenticate = () => {
//   showConnect({
//     appDetails: {
//       name: "FLATLAY",
//       icon: "https://flatlay.io/assets/images/shared/Flatlay-Logo.svg",
//     },
//     redirectTo: "/",
//     onFinish: () => {
//       window.location.reload();
//     },
//     userSession: userSession,
//   });
// };

// export const authenticateByWallet = (setState) => {
//   showConnect({
//     appDetails: {
//       name: "FLATLAY",
//       icon: "https://flatlay.io/assets/images/shared/Flatlay-Logo.svg",
//     },
//    // redirectTo: "/",
//     onFinish: () => {
//       const message = userSession.loadUserData().profile.stxAddress.mainnet;
//       openSignatureRequestPopup({
//         message,
//         network: new StacksTestnet(), // for mainnet, `new StacksMainnet()`
//         appDetails: {
//           name: "FLATLAY",
//           icon: "https://flatlay.io/assets/images/shared/Flatlay-Logo.svg",
//         },
//         onFinish(data) {
//           setState({
//             stacksAddress:
//               userSession.loadUserData().profile.stxAddress.mainnet,
//             signature: data.signature,
//             publicKey: data.publicKey,
//           });
//         },
//       });
//     },
//     userSession: userSession,
//   });
// };
