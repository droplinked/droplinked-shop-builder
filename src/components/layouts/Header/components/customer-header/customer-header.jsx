import Notification from "../../icons/notification/notification-icon-component";
import Cart from "../../icons/cart/cart-icon-component";
import newWalletIcon from "../../../../../assest/icon/new-wallet-icon.svg";
import DropdownContainer from "../../dropdowns/dropdown-container/DropDown-container";

import { UseWalletInfo } from "../../../../../context/wallet/WalletContext";
import { DROPDOWN_TYPE } from "../../dropdowns/dropdown.type";
import { useState } from "react";
import { UserHeaderWrapper, WalletAddressText } from "./customer-header-style";
import { Image} from "@chakra-ui/react";

const CustomerHeader = () => {
  
  const { userData } = UseWalletInfo();
  const [dropdown, setDropdown] = useState(null);

  const openProfileDropdown = () => setDropdown(DROPDOWN_TYPE.PROFILE);
  const openBasket = () => setDropdown(DROPDOWN_TYPE.BASKET);
  const openNotification = () => setDropdown(DROPDOWN_TYPE.NOTIFICATION);
  const close = () => setDropdown(null);

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
      <Cart clickBasket={openBasket} />

      <Notification click={openNotification} />

      <UserHeaderWrapper onClick={openProfileDropdown}>
        <Image
          w={{ base: "25px", md: "36px" }}
          h={{ base: "25px", md: "36px" }}
          src={newWalletIcon}
        />
        <WalletAddressText>{walletAddress()}</WalletAddressText>
      </UserHeaderWrapper>
      {dropdown && <DropdownContainer close={close} dropdown={dropdown} />}
    </>
  );
};
export default CustomerHeader;
