import WalletButton from "../components/wallet-button/wallet-button-component";
import DropdownContainer from "../dropdowns/dropdown-container/DropDown-container";
import Notification from "../icons/notification/notification-icon-component";
import ProfileIcon from "../icons/profile/profile-icon-component";
import Cart from "../icons/cart/cart-icon-component";

import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { DROPDOWN_TYPE } from "../dropdowns/dropdown.type";
import { useState } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import { useProfile } from "../../../../context/profile/ProfileContext";
import { UseWalletInfo } from "../../../../context/wallet/WalletContext";

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

        <Flex
          mr="-12px"
          px={{base:"8px",md:"12px"}}
          py="5px"
          borderRadius="0px"
          borderLeft="3px solid #353536"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          _hover={{
            bg: "#353536",
            borderRadius: "8px",
          }}
          onClick={openProfileDropdown}
        >
          <MdOutlineAccountBalanceWallet
            color="white"
            style={{ marginRight: "8px" }}
            size='35px'
          />
          <Text
            fontSize={{ base: "12px", md: "16px" }}
            fontWeight="600"
            color="white"
            d={{base:'none' , md:'block'}}
          >
            {walletAddress()}
          </Text>
        </Flex>

        {/* get dropdown state and show dropdown match with state value */}
        {dropdown && <DropdownContainer close={close} dropdown={dropdown} />}
      </Flex>
    </>
  );
}
