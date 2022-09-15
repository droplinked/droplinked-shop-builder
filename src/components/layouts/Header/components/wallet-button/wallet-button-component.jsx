//import { UseWalletInfo } from "../../../../../context/wallet/WalletContext";
import { Image, Box } from "@chakra-ui/react";
import { authenticateByWallet } from "../../../../../services/wallet-auth/auth";
import { useState, useEffect } from "react";
import { signInViaWallet } from "../../../../../api/base-user/Auth-api";
import { useProfile } from "../../../../../context/profile/ProfileContext";
import { useToasty } from "../../../../../context/toastify/ToastContext";

import HeaderItem from "../header-button/Header-btn-component";
import headerWalletIcon from "../../../../../assest/icon/headerWalletIcon.svg";
import WalletModal from "./wallet-modal";

//import activeWalletIcon from "../../../../../assest/icon/pink-wallet.png";

export default function WalletButton({ haventEmail }) {
  // const { onSignOut, userData, authenticate } = UseWalletInfo();
  const { addProfile } = useProfile();
  const { successToast, errorToast } = useToasty();

  const [state, setState] = useState(null);
  const [walletModal, setWalletModal] = useState(false);
  console.log(haventEmail);

  useEffect(() => {
    if (state) {
      syncHiroWallet();
    }
  }, [state]);

  const syncHiroWallet = async () => {
    let result = await signInViaWallet(state);
   // console.log(result);
    if (result.status == "success") {
      //      console.log(result.data);
      // if (!result.data.user.email) {
      //   haventEmail();
      // }
      addProfile(result.data);
      successToast("Login successfully");
      // window.location.reload();
    } else {
      errorToast(result.reason);
    }
    window.location.reload();
  };

  const signIn = () => {
    //  if( navigator.userAgent.match(/Android/i) != null || navigator.userAgent.match(/iPhone/i)!=null){
    //   setWalletModal(true)
    //  }else{
    //   authenticateByWallet(setState);
    //  }

    authenticateByWallet(setState);
  };

  const closeWalletModal = () => setWalletModal(false);

  return (
    <>
      <HeaderItem
        //  click={(userData == undefined) ? authenticate : onSignOut}
        //color={userData == undefined ? "#fff" : "#8053ff"}
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
        Connect wallet
      </HeaderItem>
      {walletModal && <WalletModal close={closeWalletModal} />}

      {/* <WalletModal /> */}
    </>
  );
}
