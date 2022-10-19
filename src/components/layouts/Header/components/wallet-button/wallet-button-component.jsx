import { Image, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
//import { signInViaWallet } from "../../../../../api/base-user/Auth-api";
import { useProfile } from "../../../../../context/profile/ProfileContext";
import { useToasty } from "../../../../../context/toastify/ToastContext";

import HeaderItem from "../header-button/Header-btn-component";
import headerWalletIcon from "../../../../../assest/icon/headerWalletIcon.svg";
import newWalletIcon  from "../../../../../assest/icon/new-wallet-icon.svg"
import WalletModal from "./wallet-modal";

//import activeWalletIcon from "../../../../../assest/icon/pink-wallet.png";

export default function WalletButton({ haventEmail }) {
  const { addProfile, signinWithaWallet } = useProfile();
  const { successToast, errorToast } = useToasty();

  const [walletModal, setWalletModal] = useState(false);

  const signIn = () => {
    //  if( navigator.userAgent.match(/Android/i) != null || navigator.userAgent.match(/iPhone/i)!=null){
    //   setWalletModal(true)
    //  }else{
    //
    //  }
    signinWithaWallet();
  };

  const closeWalletModal = () => setWalletModal(false);

  return (
    <>
      <HeaderItem color="#fff" click={signIn}>
        <Image
          w={{ base: "25px", md: "36px" }}
          h={{ base: "25px", md: "36px" }}
          mr={{ base: "0px", sm: "5px" }}
          src={newWalletIcon}
          // src={userData == undefined ? headerWalletIcon : activeWalletIcon}
        />
        <Box
          d={{ base: "none", sm: "block" }}
          px={{ base: "-8px", sm: "0px" }}
          pt={{ base: "3px", md: "0px" }}
        >
          Connect
        </Box>
      </HeaderItem>
      {walletModal && <WalletModal close={closeWalletModal} />}

      {/* <WalletModal /> */}
    </>
  );
}
