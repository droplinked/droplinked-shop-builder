import DropdownContainer from "../dropdowns/dropdown-container/DropDown-container";
import Notification from "../icons/notification/notification-icon-component";
import Cart from "../icons/cart/cart-icon-component";
import newWalletIcon from "../../../../assest/icon/new-wallet-icon.svg";

import { DROPDOWN_TYPE } from "../dropdowns/dropdown.type";
import { useState } from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import { useProfile } from "../../../../context/profile/ProfileContext";
import { UseWalletInfo } from "../../../../context/wallet/WalletContext";
import { useShop } from "../../../../context/shop/ShopContext";
import { UserHeaderWrapper, WalletAddressText } from "./User-header-style";

export default function UserHeader() {
  // state for manage dropdowns
  const [dropdown, setDropdown] = useState(null);
  const { userData } = UseWalletInfo();
  const { isCustomer } = useProfile();
  const { shop } = useShop();

  console.log(shop.name);

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
    <Flex alignItems="center" ml={{ base: "10px", md: "15px" }}>
      {isCustomer() ? (
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
        </>
      ) : (
        <>
          <Text color="white" fontSize={{base:'16px',md:"24px"}} fontWeight="500" mr={{base:'8px',md:"16px"}}>
            {shop.name}
          </Text>
          <Flex
            w={{base:'36px',md:"46px"}}
            h={{base:'36px',md:"46px"}}
            borderRadius="50%"
            bg="subLayer"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="white" fontSize={{base:'20px',md:"28px"}} fontWeight="600">
              {shop.name.charAt(0).toUpperCase()}
            </Text>
          </Flex>
        </>
      )}
      {dropdown && <DropdownContainer close={close} dropdown={dropdown} />}
    </Flex>
  );
}
