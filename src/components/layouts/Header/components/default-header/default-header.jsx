import { useState } from "react";
import { DROPDOWN_TYPE } from "../../dropdowns/dropdown.type";
import { Box } from "@chakra-ui/react";

import HeaderItem from "../header-button/Header-btn-component";
import WalletButton from "../wallet-button/wallet-button-component";
import Cart from "../../icons/cart/cart-icon-component";
import DropdownContainer from "../../dropdowns/dropdown-container/DropDown-container";
import AuthModal from "../../../../../modals/auth/AuthModal";

export default function DefaulHeader() {

  const [authModal, setAuthModal] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  let url = window.location.pathname;


  const toggleAuthModal= () => setAuthModal((p) => !p);

  const openBasket = () => setDropdown(DROPDOWN_TYPE.BASKET);
  const close = () => setDropdown(null);

  // show login button
  // and if we are in landing page or email-confirmation or recoveri show join today
  // else show wallet icon
  return (
    <>
      {url == "/" ||
      url == "/:" ||
      url == "/email-confirmation" ||
      url == "/email-verification/:" ||
      url == "/producer/account-recovery/:token" ? (
        <>
          {/* <HeaderItem click={toggleAuthModal} mr={{ base: "10px", md: '20px' }} style={{ backgroundColor: "#181818" }}>Login</HeaderItem> */}
          <HeaderItem click={toggleAuthModal}>Login</HeaderItem>
        </>
      ) : (
        <Box d="flex" alignItems="center">
          <Cart clickBasket={openBasket} />
          <Box mr={{ base: "6px", md: "12px" }}></Box>
          <WalletButton />
          {dropdown && <DropdownContainer close={close} dropdown={dropdown} />}
        </Box>
      )}
      
      <AuthModal show={authModal} close={toggleAuthModal} />

    </>
  );
}
