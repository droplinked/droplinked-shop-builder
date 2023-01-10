
import Cart from "../cart/Cart";
import newWalletIcon from "../../../../assest/icon/new-wallet-icon.svg";
import Notification from "../notification/Notification";
import ProfileDropdown from "../profile-dropdown/ProfileDropdown";

import { UseWalletInfo } from "../../../../context/wallet/WalletContext";

import { useState } from "react";
import { UserHeaderWrapper, WalletAddressText } from "./CustomerHeader-style";
import { Image } from "@chakra-ui/react";

const CustomerHeader = () => {
  const { userData } = UseWalletInfo();
  const [showProfileDropdown, setShowProfileDropdown] = useState(null);

  const toggleProfileDropdown = () => setShowProfileDropdown((p) => !p);

  const walletAddress = () => {
    if (userData) {
      let address = userData.profile.stxAddress.mainnet;
      return (
        address.substring(0, 4) +
        "...." +
        address.substring(address.length - 4, address.length)
      );
    }
  };

  return (
    <>
      <Cart />

      <Notification />

      <UserHeaderWrapper onClick={toggleProfileDropdown}>
        <Image
          w={{ base: "25px", md: "36px" }}
          h={{ base: "25px", md: "36px" }}
          src={newWalletIcon}
        />
        <WalletAddressText>{walletAddress()}</WalletAddressText>
      </UserHeaderWrapper>
      <ProfileDropdown show={showProfileDropdown} close={toggleProfileDropdown} />
    </>
  );
};
export default CustomerHeader;
