import DropdownContainer from "../dropdowns/dropdown-container/DropDown-container";
import Notification from "../icons/notification/notification-icon-component";
import Cart from "../icons/cart/cart-icon-component";
import newWalletIcon from "../../../../assest/icon/new-wallet-icon.svg";
import burgerIcon from "../../../../assest/icon/burger-icon.svg";
import ProducerSlide from "../dropdowns/producer-slide/producer-slide";

import { DROPDOWN_TYPE } from "../dropdowns/dropdown.type";
import { useState } from "react";
import { Flex, Image, Box } from "@chakra-ui/react";
import { useProfile } from "../../../../context/profile/ProfileContext";
import { UseWalletInfo } from "../../../../context/wallet/WalletContext";
import { useShop } from "../../../../context/shop/ShopContext";
import {
  UserHeaderWrapper,
  WalletAddressText,
  ShopnameText,
  ProfileIconWrapper,
  ProfileChar,
  BurgerIcon,
} from "./User-header-style";

export default function UserHeader() {
  // state for manage dropdowns
  const [dropdown, setDropdown] = useState(null);
  const [openslide, setOpenSlide] = useState(false);

  const { userData } = UseWalletInfo();
  const { isCustomer } = useProfile();
  const { shop } = useShop();

  const openProfileDropdown = () => {
    setDropdown(DROPDOWN_TYPE.PROFILE);
  };
  const openBasket = () => {
    setDropdown(DROPDOWN_TYPE.BASKET);
  };

  const openNotification = () => {
    setDropdown(DROPDOWN_TYPE.NOTIFICATION);
  };

  const close = () => setDropdown(null);

  const toggleSlide = () => setOpenSlide((p) => !p);

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
          {shop && (
            <>
              <Box d={{ base: "none", sm: "flex" }} alignItems="center">
                <ShopnameText>{shop.name}</ShopnameText>
                <ProfileIconWrapper>
                  <ProfileChar>{shop.name.charAt(0).toUpperCase()}</ProfileChar>
                </ProfileIconWrapper>
              </Box>
              <BurgerIcon src={burgerIcon} onClick={toggleSlide} />
            </>
          )}
        </>
      )}
      {dropdown && <DropdownContainer close={close} dropdown={dropdown} />}
      {openslide && <ProducerSlide close={toggleSlide} />}
    </Flex>
  );
}
