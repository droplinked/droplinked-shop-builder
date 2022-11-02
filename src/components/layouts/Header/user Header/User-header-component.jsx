import DropdownContainer from "../dropdowns/dropdown-container/DropDown-container";
import Notification from "../icons/notification/notification-icon-component";
import Cart from "../icons/cart/cart-icon-component";
import newWalletIcon from "../../../../assest/icon/new-wallet-icon.svg";

import { DROPDOWN_TYPE } from "../dropdowns/dropdown.type";
import { useState } from "react";
import { Flex, Image } from "@chakra-ui/react";
import { useProfile } from "../../../../context/profile/ProfileContext";
import { UseWalletInfo } from "../../../../context/wallet/WalletContext";
import { UserHeaderWrapper, WalletAddressText } from "./User-header-style";

export default function UserHeader() {
  // state for manage dropdowns
  const [dropdown, setDropdown] = useState(null);
  const { userData } = UseWalletInfo();
  const { isCustomer, isRegisteredProducer } = useProfile();

  const openProfileDropdown = () => {
    setDropdown(DROPDOWN_TYPE.PROFILE);
  };
  const openBasket = () => {
    setDropdown(DROPDOWN_TYPE.BASKET);
  };

  const openNotification = () => {
    setDropdown(DROPDOWN_TYPE.NOTIFICATION);
  };

  const close = () => {
    setDropdown(null);
  };

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
      {/* {isCustomer() && <WalletButton />} */}

      <Flex alignItems="center" ml={{ base: "10px", md: "15px" }}>
        {/* cart icon (show if type == producer) */}
        {isCustomer() && <Cart clickBasket={openBasket} />}

        {/* notification icon (show if type == producer)*/}
        <Notification click={openNotification} />

        {/* profile icon */}
        {/* <ProfileIcon click={openProfileDropdown} /> */}

        <UserHeaderWrapper onClick={openProfileDropdown}>
          <Image
            w={{ base: "25px", md: "36px" }}
            h={{ base: "25px", md: "36px" }}
            src={newWalletIcon}
          />
          <WalletAddressText>{walletAddress()}</WalletAddressText>
        </UserHeaderWrapper>

        {/* get dropdown state and show dropdown match with state value */}
        {dropdown && <DropdownContainer close={close} dropdown={dropdown} />}
      </Flex>
    </>
  );
}
