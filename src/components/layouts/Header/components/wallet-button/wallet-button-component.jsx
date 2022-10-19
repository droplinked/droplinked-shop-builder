
import { Image ,Box} from "@chakra-ui/react";
import { useState, useEffect } from "react";
//import { signInViaWallet } from "../../../../../api/base-user/Auth-api";
import { useProfile } from "../../../../../context/profile/ProfileContext";
import { useToasty } from "../../../../../context/toastify/ToastContext";

import HeaderItem from "../header-button/Header-btn-component";
import headerWalletIcon from "../../../../../assest/icon/headerWalletIcon.svg";
import WalletModal from "./wallet-modal";

//import activeWalletIcon from "../../../../../assest/icon/pink-wallet.png";

export default function WalletButton({ haventEmail }) {

  const { addProfile ,signinWithaWallet} = useProfile();
  const { successToast, errorToast } = useToasty();

  const [walletModal, setWalletModal] = useState(false);



  const signIn = () => {
    //  if( navigator.userAgent.match(/Android/i) != null || navigator.userAgent.match(/iPhone/i)!=null){
    //   setWalletModal(true)
    //  }else{
    //  
    //  }
    signinWithaWallet()

  };

  const closeWalletModal = () => setWalletModal(false);

  return (
    <>
      <HeaderItem
        color="#fff"
        click={signIn}
      >
        <Image
          w={{ base: "15px", md: "25px" }}
          h={{ base: "15px", md: "25px" }}
          mr="5px"
          src={headerWalletIcon}
          // src={userData == undefined ? headerWalletIcon : activeWalletIcon}
        />
        <Box d={{base:'none' , sm:'block'}} pt={{base: "3px", md: "0px"}}>Connect</Box>
      
      </HeaderItem>
      {walletModal && <WalletModal close={closeWalletModal} />}

      {/* <WalletModal /> */}
    </>
  );
}
