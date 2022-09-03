import "./test.scss"
import { AppConfig, showConnect, UserSession } from "@stacks/connect-react";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });
console.log(userSession);
function authenticate() {
  showConnect({
    appDetails: {
      name: "Stacks React Starter",
      icon: window.location.origin + "/logo512.png",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}

function disconnect() {
  userSession.signUserOut("/");
}

const Test = () => {
  return (
    <div className="test-wrapper">
      <div className="test-container">
      {userSession.isUserSignedIn() ? (
        <div>
          <button className='test-button' onClick={disconnect}>
            Disconnect Wallet
          </button>
          <p className="test-text">
            mainnet: {userSession.loadUserData().profile.stxAddress.mainnet}
          </p>
          <p className="test-text">
            testnet: {userSession.loadUserData().profile.stxAddress.testnet}
          </p>
        </div>
      ) : (
        <button className='test-button' onClick={authenticate}>
          Connect Wallet
        </button>
      )}
      </div>
    </div>
  );
  //

  // if (userSession.isUserSignedIn()) {
  //   return (
  //     <div>
  //       <button className="Connect" onClick={disconnect}>
  //         Disconnect Wallet
  //       </button>
  //       <p>mainnet: {userSession.loadUserData().profile.stxAddress.mainnet}</p>
  //       <p>testnet: {userSession.loadUserData().profile.stxAddress.testnet}</p>
  //     </div>
  //   );
  // }

  // return (
  //   <button className="Connect" onClick={authenticate}>
  //     Connect Wallet
  //   </button>
  // );
};

export default Test;
