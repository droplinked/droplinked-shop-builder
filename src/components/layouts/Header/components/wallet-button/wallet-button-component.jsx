//import { UseWalletInfo } from "../../../../../context/wallet/WalletContext";
import { Image } from "@chakra-ui/react";
import { authenticateByWallet } from "../../../../../services/wallet-auth/auth";
import { useState, useEffect } from "react";
import { signInViaWallet } from "../../../../../api/base-user/Auth-api";
import { useProfile } from "../../../../../context/profile/ProfileContext";
import { useToasty } from "../../../../../context/toastify/ToastContext";

import HeaderItem from "../header-button/Header-btn-component";
import headerWalletIcon from "../../../../../assest/icon/headerWalletIcon.svg";
//import activeWalletIcon from "../../../../../assest/icon/pink-wallet.png";

export default function WalletButton() {
  // const { onSignOut, userData, authenticate } = UseWalletInfo();
  const { addProfile } = useProfile();
  const { successToast, errorToast } = useToasty();
  const [state, setState] = useState(null);

  useEffect(() => {
    if (state) {
      syncWithWallet();
    }
  }, [state]);

  const syncWithWallet = async () => {
    let result = await signInViaWallet(state);
    if (result.status == "success") {
      addProfile(result.data);
      successToast("Login successfully");
    } else {
      errorToast(result.reason);
    }
  };

  const signIn = () => {
    authenticateByWallet(setState);
  };

  return (
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
      Wallet
    </HeaderItem>
  );
}
