import "./test.scss";

import axios from "axios";
import SelectInput from "../../components/shared/SelectInput/SelectInput"



const getShopInfoByShopname = async () => {
  const res = await axios.get("https://restcountries.com/v3.1/all");
};


getShopInfoByShopname();

const Test = () => {

  const valueList = ['aa' , 'bb' , 'cc' , 'dd' ]
  return (
    <div className="test-wrapper">
       <SelectInput valueList={valueList} placeholder='Choose country...' />
      <div className="test-container">
       
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

