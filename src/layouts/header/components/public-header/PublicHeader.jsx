import { useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import { HeaderButton } from "../../Header-style";


import AuthModal from "../../../../modals/auth/AuthModal";
import newWalletIcon from "../../../../assest/icon/new-wallet-icon.svg";
import WalletModal from "../../../../modals/wallet/WalletModal";
import Cart from "../cart/Cart";
export default function PublicHeader() {
  const [authModal, setAuthModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  let url = window.location.pathname;

  const toggleAuthModal = () => setAuthModal((p) => !p);
  const toggleWalletModal = () => setShowWalletModal((p) => !p);



  const isOnShopPage = () => {
    if (
      url == "/" ||
      url == "/:" ||
      url == "/email-confirmation" ||
      url == "/email-verification/:" ||
      url == "/producer/account-recovery/:token"
    )
      return false;
    else return true;
  };
  

  return (
    <>
      {isOnShopPage() ? (
        <Box display="flex" alignItems="center">
          <Cart />
          <Box mr={{ base: "6px", md: "12px" }}></Box>
          <HeaderButton onClick={toggleWalletModal}>
            <Image
              w={{ base: "25px", md: "36px" }}
              h={{ base: "25px", md: "36px" }}
              mr={{ base: "0px", sm: "5px" }}
              src={newWalletIcon}
            />
            Connect
          </HeaderButton>
        </Box>
      ) : (
        <HeaderButton onClick={toggleAuthModal}>Login</HeaderButton>
      )}

      <AuthModal show={authModal} close={toggleAuthModal} />
      <WalletModal show={showWalletModal} close={toggleWalletModal} />
    </>
  );
}
